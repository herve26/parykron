const fs = require('fs');
const { ipcMain } = require('electron');

function addBook(event, arg){
    console.log(event, arg)
}

exports.addBook = addBook