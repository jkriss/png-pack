const extract = require('png-chunks-extract')
const { EMBEDDED_DATA_KEYWORD } = require('./common')

const decode = (image, opts={}) => {
  const chunks = extract(image).filter(c => c.name === 'zEXt' || c.name === 'zTXt')
  const keyword = opts.keyword ? Buffer.from(opts.keyword) : EMBEDDED_DATA_KEYWORD
  for (let chunk of chunks) {
    let start = 0
    let nullByteCount = 0
    for (; start<chunk.data.length; start++) {
      if (chunk.data[start] === 0) nullByteCount++
      if (nullByteCount == 2) break
    }
    const k = Buffer.from(chunk.data.slice(0, start-1))
    if (keyword.equals(k)) {
      return Buffer.from(chunk.data.slice(start+1))
    }
  }
}

module.exports = decode
