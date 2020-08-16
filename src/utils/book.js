import DataStore from 'nedb';
import { uuid } from './uuid'
import { storeMeta } from './store';
// import { saveMeta } from './epubMeta';

const remote = window.electron.remote
const { ipcRenderer } = window.electron
const { dialog, app }  = remote
const path = remote.require('path')
const fs = remote.require('fs')
const hasha = remote.require('hasha')


const userData = app.getPath('userData')
const ebookPathName = 'book'

const ADD_BOOK = 'ADD_BOOK'


function addBook(load){

    ipcRenderer.send(ADD_BOOK, '');

    ipcRenderer.on(ADD_BOOK, async (event, arg) => {
        console.log(arg)
        if(arg.added){
            try{
                const stored = await storeMeta(arg.meta)
                if(stored.ok){
                    load()
                }
            }
            catch(err){
                if(err.status !== 409){
                    throw err
                }
                console.log(err)
            }
        }
    })
}


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