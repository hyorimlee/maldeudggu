import Text from "../../components/text/text"
import Button from "../../components/button/button"
import styles from "../../styles/record.module.css"
import RecordButton from "../../components/button/recordButton";
import AudioProgressBar from "../../components/progressBar/audioProgressBar";
import { getRequest, postRequest } from "../../modules/fetch";
import { useState } from "react";
import { useRouter } from "next/router";
import LoadingSlide from "../../components/loading/loadingslide";

function Record( {staticState, changeStaticState} ) {
  const [curSentence, setCursentence] = useState(0)
  const [isRecordEnd, setIsRecordEnd] = useState(false)
  const router = useRouter()
  const sentences = staticState.sampleSentence.sentences
  const caseId = staticState.sampleSentence.case_id
  let soundfiles = staticState.recordAudioFile
  let soundfile = soundfiles[soundfiles.length - 1]

  async function sendSoundFile() {
    if (curSentence < 4) {
      await postRequest(`/${caseId}/?sentence=${sentences[curSentence].id}`, [["audio", soundfile]])
      setCursentence(curSentence + 1)
    } else {
      await postRequest(`/${caseId}/?sentence=${sentences[curSentence].id}`, [["audio", soundfile]])
      setIsRecordEnd(true)
      const testResult = await getRequest(`/${caseId}/result/?reuse=true`)
      setTimeout(() => {
        router.push('/result')
      }, 5000)
    }
  }

  return (
    <>
      <div>
        { isRecordEnd ?
          <div>
            <LoadingSlide />
            <Text
              size={16}
              contents={'결과를 측정하고 있습니다'}
            ></Text>
          </div>
          :
          <div>
            <Text
              size={16}
              contents={`${curSentence + 1}/5`}
            ></Text>
            <Text
              size={16}
              contents={'아래의 문장을 평소 말투로 녹음해주세요'}
            ></Text>
            <Text
              color={'white'}
              size={18}
              contents={`${sentences[curSentence].sentence}`}
            ></Text>
            <RecordButton sentenceId={`${sentences[curSentence].id}`} staticState={staticState} changeStaticState={(type, data) => {
              console.log(changeStaticState)
              changeStaticState(type, data)
            }}/>
            <AudioProgressBar staticState={staticState} />
            <Button
              content={'다음으로 넘어가기'}
              color={'grey'}
              handler={sendSoundFile}
            />
          </div>
        }
      </div>
    </>
  )
}

export default Record