import { useEffect } from 'react'
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

import { firebaseConfig } from '../firebaseConfig'
import kakaoImage from '../public/sns/icon-kakao.png'

function Customize() {
  let firebaseApp
  let storage
  
  useEffect(() => {
    firebaseApp = initializeApp(firebaseConfig)
    storage = getStorage(firebaseApp);
  }, [])

  const btnClicked = (event) => {
    const canvas = event.target
    const context = canvas.getContext('2d')

    const img = new Image()
    img.src = kakaoImage.src
    img.onload = () => {
      context.drawImage(img, 0, 0, 100, 100)

      canvas.toBlob(blob => {        
        const storageRef = ref(storage, 'test.png')
        uploadBytes(storageRef, blob).then((snapshot) => {
          getDownloadURL(storageRef).then((url) => {
            console.log(url)
          })
        })
      }, 'image/png')
    }
  }
  
  return (
    <>
      <canvas onClick={btnClicked} width={100} height={100} style={{ backgroundColor: 'red'}}></canvas>
    </>
  )
}

export default Customize