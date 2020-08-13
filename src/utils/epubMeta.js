const epub = require('epub-parser')
// const fs = require('fs')
const remote = window.electron.remote
const app = remote.app
const path = remote.require('path')
const fs = remote.require('fs')
const { storeMeta } = require('./store')
const { getBasename } = require('./book')
// const app = electron.app


// const bookPath = './life.epub'

function saveMeta(arg, cb){

    let metadata = {
        title:'dc:title',
        author: 'dc:creator',
        hash:arg.hash,
        coverPath: '',
        bookPath:arg.path,
    }

    return new Promise((resolve, reject) => {
        console.log(`http://localhost:${window.serverPort}/book/${getBasename(metadata.bookPath)}`)
        epub.open(metadata.bookPath, (err, data) => {

            if(err) { reject(err); return }
            
            data.easy.simpleMeta.forEach(value => {
                
                if(Object.keys(value)[0] === metadata.title)
                    metadata.title = Object.values(value)[0]
                
                if(Object.keys(value)[0] === metadata.author)
                    metadata.author = Object.values(value)[0]
            })

            const cover = data.easy.epub2CoverUrl;

            const zip = epub.getZip()
            
            fs.mkdir(path.join(app.getPath('userData'), 'Cover'), err => {
                console.log(err.code)
                if(err && err.code !== 'EEXIST'){ reject(err); return }

                const coverPath = path.join(app.getPath('userData'), 'Cover', `${metadata.hash}${path.extname(cover)}`);
                
                fs.writeFile(coverPath, zip.file(cover).asBinary(), 'binary', async (err) => {
                    // console.log(err)
                    if(err){ reject(err); return }
                    
                    metadata.coverPath = coverPath
                    
                    try{
                        const result = await storeMeta(metadata)
                        resolve(result)
                    }
                    catch(err){
                        reject(err)
                    }
                })
            })
        })

    })

}

exports.saveMeta = saveMeta;