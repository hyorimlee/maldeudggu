const fs = require('fs')

const basedir = './public/img/'
const province = ['gangwon', 'chungcheong', 'gyeonggi', 'gyeongsang', 'jeju', 'jeolla']

// province array를 object로 바꾸면서 readdir 실행 (모든 이미지 한번에 가져옴)
async function getFileList(type) {
  const filelist = province.reduce(async (promise, p) => {
    let result = await promise
    const dir = basedir + `${type}/${p}`
    result[p] = await fs.promises.readdir(dir)
    return result
  }, {})
  return filelist
}

async function getBackgroundList() {
  const dir = basedir + 'background'
  const result = await fs.promises.readdir(dir)
  return result
}

export { getFileList, getBackgroundList }