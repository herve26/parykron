const epub = require('epub-parser')
const fs = require('fs')
const path = require('path')
const electron = require('electron')
const { storeMeta } = require('./store')
const app = electron.app


// const bookPath = './life.epub'

function saveMeta(arg, cb){

    let metadata = {
        title:'dc:title',
        author: 'dc:creator',
        hash:arg.hash,
        coverPath: '',
        bookPath:arg.path,
    }


    epub.open(metadata.bookPath, (err, data) => {

        data.easy.simpleMeta.map((value, ind) => {
            console.log(Object.keys(value)[0] === metadata.title)
            if(Object.keys(value)[0] === metadata.title)
                metadata.title = Object.values(value)[0]
            
            if(Object.keys(value)[0] === metadata.author)
                metadata.author = Object.values(value)[0]
        })

        const cover = data.easy.epub3CoverId ? data.easy.epub3CoverId : data.easy.epub2CoverUrl;

        console.log(cover)

        const zip = epub.getZip()

        fs.mkdir(path.join(app.getPath('userData'), 'Cover'), err => {
            
            const coverPath = path.join(app.getPath('userData'), 'Cover', `${metadata.hash}${path.extname(cover)}`);
            
            fs.writeFile(coverPath, zip.file(cover).asBinary(), 'binary', (err) => {
                console.log(err)
                metadata.coverPath = coverPath
                storeMeta(metadata, saved => {
                    cb(saved)
                })
                // console.log(metadata)
                // cb(metadata)
            })

        })

        // console.log(metadata)
    })

}

exports.saveMeta = saveMeta;