/* 
- Description
  주어진 시간을 기초로 랜덤한 시간 이후에 콜백함수를 실행시킴

- input
  min : 최소 시간 (1000 : 1초)
  duration : 지속 시간 (1000 : 1초)
  cb : 랜덤한 시간 이후 실행시킬 콜백 함수
*/
const randomDelay = (min, duration, cb) => {
  setTimeout(() => {
    cb()
  }, min + Math.random() * duration)
}

/*
- Description
  일정한 시간 이후에 콜백함수를 실행시킴

- input
  ms : 시간 (1000: 1초)
  cb : 일정한 시간 이후 실행시킬 콜백 함수 
*/
const timeDelay = (ms, cb) => {
  setTimeout(() => {
    cb
  }, ms)  
}


export { randomDelay, timeDelay }