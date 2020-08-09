const express = require('express')
const path = require('path')
const electron = require('electron')
const cors = require('cors')

// const app = electron.app
const expApp = express()


const startServer = (app) => {
    const publicFolder = app.getPath('userData')
    return new Promise((resolve, reject) => {
        expApp.use(cors())
        expApp.use('/book', express.static(path.join(publicFolder, 'book')))
        expApp.use('/cover', express.static(path.join(publicFolder, 'Cover')))
        const server = expApp.listen(0, err => {
            if(err)
                reject('Error initializing the server')
            else
                resolve(server.address().port)    
        })
    })
}

exports.startServer = startServer