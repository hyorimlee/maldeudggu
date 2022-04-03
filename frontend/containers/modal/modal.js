import { useState } from 'react'

function Modal({ show }) {
  const [isBrower, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  // handleClose = (e) => {
  //   e.preventDefault()
  //   onclose()
  // }

  return (
    <>
    </>
  )
}

export default Modal