import {useState, useEffect} from 'react'
import Pouchdb from 'pouchdb';
import PouchFind from 'pouchdb-find'
import PouchMigrate from 'pouchdb-migrate'
import PouchUpsert from 'pouchdb-upsert'

Pouchdb.plugin(PouchFind)
Pouchdb.plugin(PouchUpsert)
Pouchdb.plugin(PouchMigrate)

window.serverPort = window.electron.remote.getGlobal('serverPort')

function useCommentStore(hash){

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState(null)
    const [oldComment, setOldComment] = useState(null)

    const db = new Pouchdb('comments')

    async function getAllComments(){
        const docs = await db.find({selector: {hash:{$eq: hash}}})
        setComments(docs.docs)
    }

    async function addComment(){
        if(newComment){
            try{
                const result = await db.post({hash: hash, type: newComment.type, value: newComment.value, range: newComment.range, color: newComment.color})
                if(result.ok){
                    getAllComments()
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }

    async function removeComment(){
        if(oldComment){
            try{
                const result = await db.remove(oldComment)
                if(result.ok)
                    getAllComments()
            }
            catch(err){
                console.log(err)
            }
        }
    }

    useEffect(() => {
        addComment();
    }, [newComment])

    useEffect(() => {
        removeComment();
    }, [oldComment])

    useEffect(() => {
        getAllComments();
    }, [])

    return [comments, {setNewComment, setOldComment}]
}



async function storeMeta(meta){

    const db = new Pouchdb('booksMeta')
    
    meta._id = meta.hash
    meta.updated_at = Math.floor(Date.now() / 1000)
    meta.created_at = Math.floor(Date.now() / 1000)

    return db.put(meta)
}

function useGetAllBooks(){
    
    const [ books, setAllBooks ] = useState([])
    const [ newBook, setAddedNewBook] = useState({})

    const db = new Pouchdb('booksMeta')

    useEffect(() => {
        async function getDocs(){
            const bs = await db.allDocs({include_docs: true})
            setAllBooks(bs.rows)
        }
        getDocs()
    }, [newBook])

    async function reloadBooks(){
        const bs = await db.allDocs({include_docs: true})
        setAllBooks(bs.rows)
    }

    return [books, reloadBooks, setAddedNewBook]
}

function useAppConfig(){
    // const [appSettings, setAppSettings ] = useState({})

    // const db = new Pouchdb('appSettings')

    // async function createSettings(){
    //     const result = await db.post({last_opened: ''})
    //     return result.ok ? result.id : false
    // }

    // useEffect(() => {
    //     async function getAppSettings(){
    //         let settings = await db.allDocs({include_docs: true});
            
    //         if(!settings.total_rows){
    //             const id = createSettings()
    //             if(id){
    //                 settings = await db.allDocs({include_docs: true})
    //             }
    //         }
    //         // console.log(settings)
    //         setAppSettings(settings.rows.length ? settings.rows[0] : {})
    //     }
    //     getAppSettings()
    // }, [])

    // return [appSettings]
}


async function cleardb(name){
    const db = new Pouchdb(name);
    try{
        await db.destroy()
    }
    catch(err){
        console.log(err)
    }
}


function clearMetadb(){
    cleardb('booksMeta')   
}

async function updateBookMeta(id, meta){
    const db = new Pouchdb('booksMeta')

    try{
        const result = await db.upsert(id, doc => {doc[meta.name] = meta.value; return doc})
        if(result && result.updated){
            return true
        }
        return false
    }
    catch(err){
        console.log(err)
        return false
    }
}


function updateBookUpdateTime(book){
    return updateBookMeta(book.id, {name: 'updated_at', value: Math.floor(Date.now() / 100)}) 
    
}

function updateBookLastRange(book, range){
    return updateBookMeta(book.id, {name: 'range', value: range})
}

function updateBookFontSize(book, size){
    return updateBookMeta(book.id, {name: 'font_size', value: size})
}

function updateBookFont(book, font){
    return updateBookMeta(book.id, {name: 'font', value: font})
}

function updateBookLineHeight(book, lHeight){
    return updateBookMeta(book.id, {name: 'line_height', value: lHeight})
}

function updateBookParagraphMargin(book, pMargin){
    return updateBookMeta(book.id, {name: 'paragraph_margin', value: pMargin})
}

function updateBookFlowType(book, flow){
    return updateBookMeta(book.id, {name: 'page_flow', value: flow})
}


// TODO: Add the updated_at and created_at field to the bookMeta creation object
function migrateBookMeta(){
    const db = new Pouchdb('booksMeta')

    function migrate(doc){
        if('create_at' in doc) return
        if('updated_at' in doc) return

        doc.created_at = Math.floor(Date.now() / 1000)
        doc.updated_at = Math.floor(Date.now() / 1000)
        
        return [doc]
    }

    db.migrate(migrate)
}

const bookUpdate = {
                    font: updateBookFont, 
                    fontSize: updateBookFontSize, 
                    lastVisite: updateBookUpdateTime, 
                    range: updateBookLastRange,
                    lineHeight: updateBookLineHeight,
                    pMargin: updateBookParagraphMargin,
                    pageFlow: updateBookFlowType
                }

                
export { 
    useCommentStore, 
    storeMeta, 
    useGetAllBooks, 
    clearMetadb, 
    useAppConfig, 
    migrateBookMeta, 
    bookUpdate
};