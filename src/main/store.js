const electron = require('electron')
const DataStore = require('nedb')
const path = require('path')
const app = electron.app

const userData = app.getPath('userData')
const ebookMeta = 'ebookMeta.db'

const db = new DataStore({filename: path.join(userData, ebookMeta), autoload: true});

function storeMeta(meta){
    return new Promise( (resolve, reject) => {
    console.log('i am here')
        db.find({hash: meta.hash}, (err, docs) => {
            console.log(err)
            console.log(docs)
            if(!docs.length){
                console.log('length')
                db.insert(meta, (err, newDoc) => {
                    if(err){
                        console.log(`Error: ${err}`)
                        resolve(false)
                    }
                    else{
                        console.log('inside error still')
                        db.find({}, (er, d) => { 
                            console.log(d)
                            resolve(true)
                        })
                        
                    }
                })
            }
            else{
                reject()
            }
        })
    })
}

exports.storeMeta = storeMeta
