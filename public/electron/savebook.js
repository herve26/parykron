const {promises: fs, constants: {COPYFILE_EXCL}} = require('fs');
const path = require('path')
const { dialog, app } = require('electron');
const { getFileHash } = require('./hash')
const { createMeta } = require('./createmeta')

const documentPath = app.getPath('documents')
const appName = app.getName()

function addBook(event, arg){

    return new Promise(async (resolve, reject) => {

        const filter = [{name: 'Ebook', extensions: ['epub']}]
        const bookSrcPath = await dialog.showOpenDialog({properties:['openFile'], filters: filter});
        const epubsDestDir = path.join(documentPath, appName, 'Books');

        if(bookSrcPath.canceled){
            reject(new Error('ECANCELED: Dialogue Canceled')); 
            return
        }

        const bookDestPath = path.join(epubsDestDir, path.basename(bookSrcPath.filePaths[0]));
        
        try{
            await fs.mkdir(epubsDestDir, {recursive: true})
            await fs.copyFile(bookSrcPath.filePaths[0], bookDestPath, COPYFILE_EXCL)
        }
        catch(err){
            if(err.code && err.code !== 'EEXIST')
                reject(err)
        }

        try{
            const meta = await createMeta({path: bookDestPath, hash: await getFileHash(bookDestPath)})
            resolve(meta)
        }
        catch(err){
            reject(err)
        }
    })
}

exports.addBook = addBook