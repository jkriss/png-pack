const encodePng = require('png-chunks-encode')
const extract = require('png-chunks-extract')
const { EMBEDDED_DATA_KEYWORD } = require('./common')

const encode = (image, data) => {
  const chunks = extract(image)
  // Add new chunk before the IEND chunk
  chunks.splice(-1, 0, {
    name: 'zEXt',
    data: Buffer.concat([EMBEDDED_DATA_KEYWORD, Buffer.alloc(2), data])
  })
  return encodePng(chunks)
}

module.exports = encode
