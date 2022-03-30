import Text from "../../components/text/text"
import LoadingSlide from '../../components/loading/loadingslide'

function Loading() {
  return (
    <>
      <LoadingSlide></LoadingSlide>
      <Text
        bold
        size={16}
        contents={['결과를 분석하고 있습니다.', <br />, '잠시만 기다려주세요!']
        }
      >
      </Text >
    </>
  )
}

export default Loading