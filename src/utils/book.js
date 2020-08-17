import { storeMeta } from './store';

const { ipcRenderer, remote } = window.electron
const path = remote.require('path')

const ADD_BOOK = 'ADD_BOOK'


function addBookListener(load){

    ipcRenderer.removeAllListeners(ADD_BOOK)

    ipcRenderer.on(ADD_BOOK, async (event, arg) => {
        
        if(!arg.added) return;
        
        try{
            const stored = await storeMeta(arg.meta)
            if(stored.ok) load()
        }
        catch(err){
            if(err.status !== 409) throw err
        }
    })

}


function addBook(){
    ipcRenderer.send(ADD_BOOK, '');
}

//TODO: path has to go
function getBasename(name){
    return path.basename(name)
}


export { addBook, getBasename, addBookListener };