import { storeMeta } from './store';

const { ipcRenderer, remote } = window.electron
const path = remote.require('path')

const ADD_BOOK = 'ADD_BOOK'


function addBook(){
    ipcRenderer.send(ADD_BOOK, '');
}

function addListener({channel, cb, action}){
    ipcRenderer.removeAllListeners(channel)

    ipcRenderer.on(channel, cb(action))

}

const addBookCB = load => {
    return async function addBookCB(event, arg){
        if(!arg.added) return;
            
        try{
            const stored = await storeMeta(arg.meta)
            if(stored.ok) load()
            console.log(arg)
        }
        catch(err){
            console.log(err)
            if(err.status !== 409) throw err
        }
    }
}

const emptyCB = () => () => {}


function addListeners({loadBooks}){
    
    const eventListeners = [
        {channel: 'ADD_BOOK', cb: addBookCB, action: loadBooks},
    ]

    eventListeners.forEach(value => {
        addListener(value)
    })
}

//TODO: path has to go
function getBasename(name){
    return path.basename(name)
}


export { addBook, getBasename, addListeners };