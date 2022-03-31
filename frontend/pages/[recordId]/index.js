import Text from "../../components/text/text"
import Button from "../../components/button/button"
import styles from "../../styles/record.module.css"
import RecordButton from "../../components/button/recordButton";
import AudioProgressBar from "../../components/progressBar/audioProgressBar";
import { postRequest } from "../../modules/fetch";
import { useState } from "react";

function Record( {staticState, changeStaticState} ) {
  const [curSentence, setCursentence] = useState(0)
  const sentences = staticState.sampleSentence.sentences
  const caseId = staticState.sampleSentence.case_id
  let soundfiles = staticState.recordAudioFile
  let soundfile = soundfiles[soundfiles.length - 1]

  async function sendSoundFile() {
    if (curSentence === 4) {
      console.log('로딩페이지로 넘어가기')
    } else {
      await postRequest(`/${caseId}/?sentence=${sentences[curSentence].id}`, [["audio", soundfile]])
      setCursentence(curSentence + 1)
    }
  }

  return (
    <>
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
    </>
  )
}

export default Record