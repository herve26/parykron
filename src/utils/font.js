import React, { useState, useEffect } from 'react'
import { readdir } from 'fs'
const fs = window.electron.remote.require('fs').promises
// const fsPromise = fs.promise
const path = window.electron.remote.require('path')
const app = window.electron.remote.app
const userData = app.getPath('userData')

function useBuildFonts(){
    // function createFontsFolder(folder){
    //     return new Promise((resolve, reject) => {
    //         fs.mkdir(folder, (err, result) => {
    //             if(err && err.code !== 'EEXIST')
    //                 reject(err)
    //             else{
    //                 resolve(result)
    //             }
    //         })
    //     })
    // }

    // function readDir(dir){
    //     return new Promise((resolve, reject) => {
        
    //         fs.readdir(path.join(userData, 'Fonts'), async (err, result) => {
    //             console.log(err)
    //             if(err) reject(err)
    //             else resolve(result)
    //         })
    //     })
    // }
    async function getFonts(p){
        try{
            return await fs.readdir(p)
        }
        catch(err){
            if(err.code === 'ENOENT'){
                const dirCreated = await fs.mkdir(p)
                return await fs.readdir(p)
            }
            else{
                return false
                //console.log(err)
            }
        }
    }

    async function buildFaces(p, fonts){

        fonts.forEach(async (font, index) => {
            const isDir = await fs.lstat(path.join(p, font))
            if(isDir.isDirectory()){
                console.log(font)
                console.log(await fs.readdir(path.join(p, font)))
            }
        })
    }

    // async function buildFace(name, )

    const [fonts, setFonts ] = useState([])
    const fontPath = path.join(userData, 'Fonts');
    
    useEffect(() => {
        (async () => {
            const fonts = await getFonts(fontPath)
            console.log(fonts)
            if(fonts){
                buildFaces(fontPath, fonts)
            }
        })()
    }, [])

    return [ fonts ]
}


export { useBuildFonts }