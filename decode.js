const extract = require('png-chunks-extract')
const { EMBEDDED_DATA_KEYWORD } = require('./common')

const decode = (image) => {
  const chunks = extract(image).filter(c => c.name === 'zEXt')
  for (let chunk of chunks) {
    let start = 0
    let nullByteCount = 0
    for (; start<chunk.data.length; start++) {
      if (chunk.data[start] === 0) nullByteCount++
      if (nullByteCount == 2) break
    }
    const keyword = Buffer.from(chunk.data.slice(0, start-1))
    if (keyword.equals(EMBEDDED_DATA_KEYWORD)) {
      return Buffer.from(chunk.data.slice(start+1))
    }
  }
}

module.exports = decode
