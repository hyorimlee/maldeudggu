const fs = require('fs')

const basedir = './public/img/'

async function getFileList(type, location) {
  const dir = basedir + `${type}/${location}`
  const files = await fs.promises.readdir(dir)
  return files
}

export { getFileList }