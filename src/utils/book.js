import DataStore from 'nedb';
import { saveMeta } from './epubMeta';

const remote = window.electron.remote
const { dialog, app }  = remote
const path = remote.require('path')
const fs = remote.require('fs')
const hasha = remote.require('hasha')

const ipc = window.electron.ipcRenderer

const userData = app.getPath('userData')
const ebookPathName = 'book'

function addBook(){
    return new Promise((resolve, reject) => {
        ipc.send('add-book', 'what a book')
        ipc.on('add-book-reply', (event, arg) => {
            if(arg.ok){
                resolve(arg)
                return
            }
            else{
                reject(false)
            }
        })
    })
    
}

/*
function addBook(){
    
    return new Promise(async (resolve, reject) => {

        const filter = [{name: 'Ebook', extensions: ['epub']}]
        const bookPathResult = await dialog.showOpenDialog({properties:['openFile'], filters: filter});
        const epubDirPath = path.join(userData, ebookPathName);

        if(bookPathResult.canceled){
            reject(new Error('ECANCELED: Dialogue Canceled')); 
            return
        }

        fs.mkdir(epubDirPath, err => {
            
            if(err && err.code !== 'EEXIST'){
                reject(err)
                return
            }

            const bookSavedPath = path.join(epubDirPath, path.basename(bookPathResult.filePaths[0]));
            
            fs.copyFile(bookPathResult.filePaths[0], bookSavedPath, async (err) => {
                
                if(err){reject(err); return}

                try{
                    const hash = await hasha.fromFile(bookSavedPath, {algorithm: 'md5'});
                    const saved = await saveMeta({path: bookSavedPath, hash: hash})

                    resolve(saved)
                }
                catch(err){
                    console.log(err)
                    reject(err)
                }
            })
        })

    })
}
*/

function loadBooks(){

    const userFolder = app.getPath('userData')
    const configFile = 'ebookMeta.db'

    const db = new DataStore({filename: path.join(userFolder, configFile), autoload: true});

    db.find({}, (err, docs) => {
        console.log(docs)
    })
}

function getBasename(name){
    return path.basename(name)
}


export { addBook, loadBooks, getBasename };