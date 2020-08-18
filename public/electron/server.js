const express = require('express')
const path = require('path')
const electron = require('electron')
const cors = require('cors')

// const app = electron.app
const expApp = express()


const startServer = (app) => {
    const publicFolder = app.getPath('documents')
    return new Promise((resolve, reject) => {
        expApp.use(cors())
        expApp.use('/book', express.static(path.join(app.getPath('documents'), app.getName(),'Books')))
        expApp.use('/cover', express.static(path.join(app.getPath('userData'), 'Cover')))
        const server = expApp.listen(0, err => {
            if(err)
                reject('Error initializing the server')
            else
                resolve(server.address().port)    
        })
    })
}

exports.startServer = startServer