const encodePng = require('png-chunks-encode')
const extract = require('png-chunks-extract')
const { EMBEDDED_DATA_KEYWORD } = require('./common')

const encode = (image, data, opts={}) => {
  const chunks = extract(image)
  const keyword = opts.keyword ? Buffer.from(opts.keyword) : EMBEDDED_DATA_KEYWORD
  // Add new chunk before the IEND chunk
  chunks.splice(-1, 0, {
    name: 'zTXt',
    data: Buffer.concat([keyword, Buffer.alloc(2), data])
  })
  return encodePng(chunks)
}

module.exports = encode
