import Text from "../../../components/text/text";
import Image from "../../../components/image/image";
import Button from "../../../components/button/button";
import styles from "../../../styles/record.module.css";
import RecordButton from "../../../components/button/recordButton";
import AudioProgressBar from "../../../components/progressBar/audioProgressBar";
import LoadingSlide from '../../../components/loading/loadingslide'
import ThreeDotsWave from "../../../components/loading/loading";

import { getRequest, postRequest } from "../../../modules/fetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { randomDelay } from "../../../modules/delay";


export async function getStaticPaths() {
  const sentences = await getRequest('/sentence')
  const paths = sentences.map(s => ({ params: { recordId: s.id.toString() } }))

  return {
    paths,
    fallback: false   // false - 없는 id 값인 경우 404 페이지, true - build 타임으로 다시 돌아가서 서버에서 재렌더
  }
}

export async function getStaticProps({ params }) {
  const sentence = await getRequest(`/sentence/${params.recordId}`)

  return {
    props: {
      id: params.recordId,
      sentence: sentence.sentence
    }
  }
}

function Record({ staticState, changeStaticState, sentence, id }) {
  const [isEnd, setIsEnd] = useState(false)
  const [pageFlip, setPageFlip] = useState(false)
  const router = useRouter()

  console.log(pageFlip)

  // 전역 state 값이 비어있으면 404 페이지로 이동
  useEffect(() => {
    if (staticState.caseId === -1 || staticState.sentences.length === 0) {
      router.push({ pathname: '/404', query: { code: '0001' } })
    }

    router.events.on('routeChangeComplete', () => {
      setPageFlip(false)
    })
  }, [])

  let soundfiles = staticState.recordAudioFile
  let soundfile = soundfiles[soundfiles.length - 1]

  async function sendSoundFile() {
    await postRequest(`/${staticState.caseId}/?sentence=${id}`, [["audio", soundfile]])

    if (staticState.recordCount < 4) {
      setPageFlip(true)
      changeStaticState('recordCount', staticState.recordCount + 1)
      console.log('pageflip', pageFlip)

      randomDelay(1000, 1000, () => router.replace(`/record/${staticState.sentences[staticState.recordCount + 1].id}`))
    } else {
      setIsEnd(true)
      const testResult = await getRequest(`/${staticState.caseId}/result/?reuse=${staticState.reuse}`)
      changeStaticState('result', testResult.result)

      randomDelay(2000, 1000, () => router.replace('/result'))
    }
  }

  function reRecord() {
    changeStaticState('audioData', null)
  }

  return (
    <>
      {
        isEnd
          ?
          (
            <>
              <LoadingSlide />
              <Text
                size={18}
                bold={true}
                contents={['결과를 분석하고 있습니다.', <br />, '잠시만 기다려주세요!']}
              ></Text>
            </>
          )
          : pageFlip
            ?
            (
              <ThreeDotsWave
                contents={'다음 녹음을 준비중이에요.'}
              ></ThreeDotsWave>
            )
            :
            (
              <>
                <Text
                  size={16}
                  contents={`${staticState.recordCount + 1}/5`}
                ></Text>
                <Text
                  size={16}
                  contents={'녹음 버튼을 눌러 아래의 문장을 평소 말투로 녹음해주세요.'}
                ></Text>
                <Text
                  size={12}
                  contents={'문장을 다 읽고 버튼을 다시 눌러 녹음을 종료해주세요.'}
                ></Text>
                <div className={styles.sampleSentence}>
                  <Image
                    type={'sentenceBackground'}
                    path={'/img/logo/text-background.png'}
                  ></Image>
                  <Text
                    color={'white'}
                    size={18}
                    contents={`${sentence}`}
                  ></Text>
                </div>
                {
                  staticState.recordAudio.length === staticState.recordCount + 1
                    ?
                    (
                      <>
                        <AudioProgressBar staticState={staticState} />
                        <Button
                          content={'여기를 눌러 다시 녹음하기'}
                          handler={reRecord}
                        ></Button>
                        <Button
                          content={'다음으로 넘어가기'}
                          handler={sendSoundFile}
                        />
                      </>
                    )
                    :
                    (
                      <>
                        <RecordButton sentenceId={`${id}`} staticState={staticState} changeStaticState={(type, data) => {
                          changeStaticState(type, data)
                        }} />
                        <Button
                          content={'음성을 녹음해주세요'}
                          disabled
                        ></Button>
                      </>
                    )
                }
              </>
            )
      }
    </>
  )
}

export default Record