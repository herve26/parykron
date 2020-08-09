const { parseEpub } = require('@gxl/epub-parser')
const path = require('path')

async function getEpub(){
    const epubObj = await parseEpub(path.join(__dirname, 'public', 'life.epub'), {type: 'path'})
    console.log(epubObj)
}

getEpub()