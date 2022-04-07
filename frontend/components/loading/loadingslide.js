import styles from "./loadingslide.module.css"

// swiper
import "swiper/css"
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper"

// 전국 & 색상 전부 가져오기 (6*9)
// 이미지 크기 맞춰야 함
const locations = [
  'gyeonggi',
  'gangwon',
  'chungcheong',
  'gyeongsang',
  'jeolla',
  'jeju',
]

const images = []

for (let location of locations) {
  for (let idx = 1; idx < 10; idx++) {
    images.push(`/img/character/${location}/${location}-${idx}.svg`)
  }
}

images.sort(() => Math.random() - 0.5);

function LoadingSlide() {
  return (
    <>
      <Swiper
        centeredSlides={true}
        loop={true}
        pagination={false}
        autoplay={{
          delay: 800,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <img src={image} alt="image"></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default LoadingSlide