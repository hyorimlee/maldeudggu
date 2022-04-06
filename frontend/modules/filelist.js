import * as fs from 'fs'

// const fs = require('fs')

const basedir = './public/img/'
let province = ['gangwon', 'chungcheong', 'gyeonggi', 'gyeongsang', 'jeju', 'jeolla']

const comb = {
  'gangwon': [
    [ 'gangwon', 'chungcheong', 'gyeonggi' ],
    [ 'gangwon', 'chungcheong', 'gyeongsang' ],
    [ 'gangwon', 'chungcheong', 'jeju' ],
    [ 'gangwon', 'chungcheong', 'jeolla' ],
    [ 'gangwon', 'gyeonggi', 'gyeongsang' ],
    [ 'gangwon', 'gyeonggi', 'jeju' ],
    [ 'gangwon', 'gyeonggi', 'jeolla' ],
    [ 'gangwon', 'gyeongsang', 'jeju' ],
    [ 'gangwon', 'gyeongsang', 'jeolla' ],
    [ 'gangwon', 'jeju', 'jeolla' ]
  ],
  'chungcheong': [
    [ 'chungcheong', 'gangwon', 'gyeonggi' ],
    [ 'chungcheong', 'gangwon', 'gyeongsang' ],
    [ 'chungcheong', 'gangwon', 'jeju' ],
    [ 'chungcheong', 'gangwon', 'jeolla' ],
    [ 'chungcheong', 'gyeonggi', 'gyeongsang' ],
    [ 'chungcheong', 'gyeonggi', 'jeju' ],
    [ 'chungcheong', 'gyeonggi', 'jeolla' ],
    [ 'chungcheong', 'gyeongsang', 'jeju' ],
    [ 'chungcheong', 'gyeongsang', 'jeolla' ],
    [ 'chungcheong', 'jeju', 'jeolla' ]
  ],
  'gyeonggi': [
    [ 'gyeonggi', 'gangwon', 'chungcheong' ],
    [ 'gyeonggi', 'gangwon', 'gyeongsang' ],
    [ 'gyeonggi', 'gangwon', 'jeju' ],
    [ 'gyeonggi', 'gangwon', 'jeolla' ],
    [ 'gyeonggi', 'chungcheong', 'gyeongsang' ],
    [ 'gyeonggi', 'chungcheong', 'jeju' ],
    [ 'gyeonggi', 'chungcheong', 'jeolla' ],
    [ 'gyeonggi', 'gyeongsang', 'jeju' ],
    [ 'gyeonggi', 'gyeongsang', 'jeolla' ],
    [ 'gyeonggi', 'jeju', 'jeolla' ]
  ],
  'gyeongsang': [
    [ 'gyeongsang', 'gangwon', 'chungcheong' ],
    [ 'gyeongsang', 'gangwon', 'gyeonggi' ],
    [ 'gyeongsang', 'gangwon', 'jeju' ],
    [ 'gyeongsang', 'gangwon', 'jeolla' ],
    [ 'gyeongsang', 'chungcheong', 'gyeonggi' ],
    [ 'gyeongsang', 'chungcheong', 'jeju' ],
    [ 'gyeongsang', 'chungcheong', 'jeolla' ],
    [ 'gyeongsang', 'gyeonggi', 'jeju' ],
    [ 'gyeongsang', 'gyeonggi', 'jeolla' ],
    [ 'gyeongsang', 'jeju', 'jeolla' ]
  ],
  'jeju': [
    [ 'jeju', 'gangwon', 'chungcheong' ],
    [ 'jeju', 'gangwon', 'gyeonggi' ],
    [ 'jeju', 'gangwon', 'gyeongsang' ],
    [ 'jeju', 'gangwon', 'jeolla' ],
    [ 'jeju', 'chungcheong', 'gyeonggi' ],
    [ 'jeju', 'chungcheong', 'gyeongsang' ],
    [ 'jeju', 'chungcheong', 'jeolla' ],
    [ 'jeju', 'gyeonggi', 'gyeongsang' ],
    [ 'jeju', 'gyeonggi', 'jeolla' ],
    [ 'jeju', 'gyeongsang', 'jeolla' ]
  ],
  'jeolla': [
    [ 'jeolla', 'gangwon', 'chungcheong' ],
    [ 'jeolla', 'gangwon', 'gyeonggi' ],
    [ 'jeolla', 'gangwon', 'gyeongsang' ],
    [ 'jeolla', 'gangwon', 'jeju' ],
    [ 'jeolla', 'chungcheong', 'gyeonggi' ],
    [ 'jeolla', 'chungcheong', 'gyeongsang' ],
    [ 'jeolla', 'chungcheong', 'jeju' ],
    [ 'jeolla', 'gyeonggi', 'gyeongsang' ],
    [ 'jeolla', 'gyeonggi', 'jeju' ],
    [ 'jeolla', 'gyeongsang', 'jeju' ]
  ]
}

// province array를 object로 바꾸면서 readdir 실행 (모든 이미지 한번에 가져옴)
async function getFileList(type, id) {
  const filteredProvince = type === 'items' ? comb[id[0]][id[1]].concat('all') : [comb[id[0]][id[1]][0]]

  const filelist = filteredProvince.reduce(async (promise, p) => {
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

export { getFileList, getBackgroundList, comb }