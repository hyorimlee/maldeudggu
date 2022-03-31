import Text from "../../components/text/text"
import Button from "../../components/button/button"
import styles from "../../styles/record.module.css"
import RecordButton from "../../components/button/recordButton";
import AudioProgressBar from "../../components/progressBar/audioProgressBar";

function Record({ staticState, changeStaticState }) {
  return (
    <>
      <Text
        size={16}
        contents={'아래의 문장을 평소 말투로 녹음해주세요'}
      ></Text>
      <Text
        color={'white'}
        size={18}
        contents={'사용자가 읽을 샘플 텍스트'}
      ></Text>
      <RecordButton staticState={staticState} changeStaticState={(data) => {
        console.log(changeStaticState)
        changeStaticState(data)
      }} />
      <AudioProgressBar staticState={staticState} />
      <Button
        link={'/1'}
        content={'다음으로 넘어가기'}
        color={'grey'}
      />
    </>
  )
}

export default Record