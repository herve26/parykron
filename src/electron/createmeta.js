const fs = require('fs').promises
const path = require('path')
const { app } = require('electron')
const epub = require('epub-parser')


function createMeta(arg){

    let metadata = {
        title:'dc:title',
        author: 'dc:creator',
        hash:arg.hash,
        coverPath: '',
        bookPath:arg.path,
        bookUrl: `/book/${path.basename(arg.path)}`
    }

    return new Promise( (resolve, reject) => {
        
        epub.open(metadata.bookPath, async (err, data) => {

            if(err) { reject(err); return }
            
            data.easy.simpleMeta.forEach(value => {
                
                if(Object.keys(value)[0] === metadata.title)
                    metadata.title = Object.values(value)[0]
                
                if(Object.keys(value)[0] === metadata.author)
                    metadata.author = Object.values(value)[0]
            })

            const cover = data.easy.epub2CoverUrl;

            const zip = epub.getZip()
            const coverPath = path.join(app.getPath('userData'), 'Cover', `${metadata.hash}${path.extname(cover)}`);
            
            try{
                await fs.mkdir(path.join(app.getPath('userData'), 'Cover'), {recursive: true})
                await fs.writeFile(coverPath, zip.file(cover).asBinary(), 'binary', {flag: 'w+'})
            }
            catch(err){
                if(err.code !== 'EEXIST')
                    reject(err)
            }

            metadata.coverPath = coverPath
            resolve(metadata)
        })

    })

}

exports.createMeta = createMeta;