const SERVER_BASE = process.env.NEXT_PUBLIC_SERVER_BASE

/*
- Description
  각종 GET 요청

- input
  url : 요청 주소
  params : 요청 파라미터 (타입: 객체) (ex. { name='Alex', age=14 })

- output
  요청 결과 반환 json 파일
*/
async function getRequest(url, params = {}) {
  try {
    const paramsKeys = Object.keys(params)
    let query

    if (paramsKeys.length) {
      query = paramsKeys.map(k => `${k}=${params[k]}`).join('&')
    }

    const response = await fetch(`${SERVER_BASE}${url}${paramsKeys.length ? '?' + query : ''}/`)

    if (response.ok) {
      const data = await response.json()
      return data
    }
    console.log('fetch 모듈 응답 Not Ok')
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

/*
- Description
  각종 POST 요청

- input
  url : 요청 주소
  datas : post와 함께 보낼 데이터

- output
  요청 결과 json 파일
*/
async function postRequest(url, datas = []) {
  try {
    let formData = new FormData()
    datas.forEach((data) => {
      console.log(data[0], data[1])
      formData.append(data[0], data[1])
    })
    console.log(formData.get('nickname'))
    const response = await fetch(`${SERVER_BASE}${url}`, {
      method: 'POST',
      body: formData
    })
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      return data
    }
    console.log('fetch 모듈 응답 Not Ok')
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

/*
- Description
  공유 이미지 저장 요청 함수

- input
  url : 요청 주소
  image : 저장할 이미지 파일 (타입: File 객체)

- output
  저장 성공 여부 json 파일
*/
async function patchRequest(url, image_url) {
  try {
    const response = await fetch(`${SERVER_BASE}${url}/`, {
      method: 'PATCH',
      body: JSON.stringify({ image_url }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const data = await response.json()
      return data
    }
    console.log('fetch 모듈 응답 Not Ok')
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export { getRequest, postRequest, patchRequest }