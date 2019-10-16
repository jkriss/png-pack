const { encode, decode } = require('../index')
const fs = require('fs')
const path = require('path')

const image = fs.readFileSync(path.join(__dirname, 'floppy.png'))
const imageWithData = encode(image, Buffer.from('Heeeeeey'))
const data = decode(imageWithData)

console.log(data.toString())
