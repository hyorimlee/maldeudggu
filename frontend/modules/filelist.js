import * as fs from 'fs'
import { locationComb } from './locationText'

// const fs = require('fs')

const basedir = './public/img/'
let province = ['gangwon', 'chungcheong', 'gyeonggi', 'gyeongsang', 'jeju', 'jeolla']

// province array를 object로 바꾸면서 readdir 실행 (모든 이미지 한번에 가져옴)
async function getFileList(type, id) {
  const filteredProvince = type === 'items' ? locationComb[id[0]][id[1]].concat('all') : [locationComb[id[0]][id[1]][0]]

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

export { getFileList, getBackgroundList }