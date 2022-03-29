import styles from "./loadingslide.module.css"

// swiper
import "swiper/css"
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper"

// 전국 & 색상 전부 가져오기 (6*9)
// 이미지 크기 맞춰야 함
const images = [
  '/img/1-1.svg',
  '/img/2-3.svg',
  '/img/3-8.svg',
  '/img/4-2.svg',
  '/img/5-4.svg',
  '/img/6-6.svg',
]

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
        {images.map((image) => (
          <SwiperSlide className={styles.swiperSlide}>
            <img src={image} alt="image"></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default LoadingSlide