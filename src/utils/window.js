const { ipcRenderer, remote } = window.electron
const BrowserWindow = remote.getCurrentWindow()

function minimizeWindow(){
    BrowserWindow.minimize()
}

function closeWindow(){
    BrowserWindow.close()
}

function maximazeWindow(){
    if(BrowserWindow.isMaximized()){
        BrowserWindow.unmaximize();
    }
    else{
        BrowserWindow.maximize();
    }
}

export { minimizeWindow, closeWindow, maximazeWindow }