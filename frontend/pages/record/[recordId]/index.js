import Text from "../../../components/text/text";
import Image from "../../../components/image/image";
import Button from "../../../components/button/button";
import styles from "../../../styles/record.module.css";
import RecordButton from "../../../components/button/recordButton";
import AudioProgressBar from "../../../components/progressBar/audioProgressBar";

import { getRequest, postRequest } from "../../../modules/fetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingSlide from '../../../components/loading/loadingslide'


export async function getStaticPaths() {
  // 모든 문장들의 ID만 받아오는 API 필요

  return {
    paths: [
      { params: { recordId: '0' }},
      { params: { recordId: '1' }},
      { params: { recordId: '2' }},
      { params: { recordId: '3' }},
      { params: { recordId: '4' }},
      { params: { recordId: '5' }},
      { params: { recordId: '6' }},
      { params: { recordId: '7' }},
      { params: { recordId: '8' }},
      { params: { recordId: '9' }},
      { params: { recordId: '10' }},
    ],
    fallback: false   // false - 없는 id 값인 경우 404 페이지, true - build 타임으로 다시 돌아가서 서버에서 재렌더
  }
}

export async function getStaticProps({ params }) {
  // 문장의 id에 맞게 문장을 가져오는 API 필요
  const sentence = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

  return {
    props: {
      id: params.recordId,
      sentence: sentence[params.recordId]
    }
  }
}


function Record( { staticState, changeStaticState, sentence, id } ) {
  const [isEnd, setIsEnd] = useState(false)
  const router = useRouter()

  // 전역 state 값이 비어있으면 404 페이지로 이동
  useEffect(() => {
    if (staticState.caseId === -1 || staticState.sentences.length === 0 ) {
      router.push('/404')
    }
  }, [])

  let soundfiles = staticState.recordAudioFile
  let soundfile = soundfiles[soundfiles.length - 1]

  async function sendSoundFile() {
    if (staticState.recordCount < 4) {
      await postRequest(`/${staticState.caseId}/?sentence=${id}`, [["audio", soundfile]])
      changeStaticState('recordCount', staticState.recordCount + 1)
      router.push(`/record/${staticState.sentences[staticState.recordCount + 1].id}`)
      console.log('next')
    } else {
      setIsEnd(true)
      await postRequest(`/${staticState.caseId}/?sentence=${id}`, [["audio", soundfile]])

      const testResult = await getRequest(`/${staticState.caseId}/result/?reuse=${staticState.reuse}`)
      changeStaticState('result', testResult.result)
      
      setTimeout(() => {
        router.push('/result')
      }, 5000)
    }
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
              contents={'결과를 분석하고 있습니다.'}
            ></Text>
          </>
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
              contents={'아래의 문장을 평소 말투로 녹음해주세요'}
            ></Text>
            <div className={styles.sampleSentence}>
              <Image
                type={'logo'}
                path={'/img/logo/text-background.png'}
              ></Image>
              <Text
                color={'white'}
                size={18}
                contents={`${sentence}`}
              ></Text>
            </div>
            <RecordButton sentenceId={`${id}`} staticState={staticState} changeStaticState={(type, data) => {
              changeStaticState(type, data)
            }}/>
            <AudioProgressBar staticState={staticState} />
            {
              staticState.recordAudio.length === staticState.recordCount + 1
              ?
              (
                <>
                  <Button
                    content={'다음으로 넘어가기'}
                    handler={sendSoundFile}
                  />
                </>
              )
              :
              (
                <>
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