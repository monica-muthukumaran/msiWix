const { app, BrowserWindow,ipcMain } = require('electron')
const remoteMain = require("@electron/remote/main");
// const electronInstaller = require('electron-winstaller');
const { autoUpdater } = require('electron-updater');
// import { MSICreator } from 'electron-wix-msi';




remoteMain.initialize();

let mainWindow;

app.on('ready',()=>{
  mainWindow=new BrowserWindow({webPreferences: {nodeIntegration: true,contextIsolation: false, enableRemoteModule: true}});
  remoteMain.enable(mainWindow.webContents);
  mainWindow.loadFile('index.html');
  //mainWindow.setMenuBarVisibility(false);
    
    
});


console.log("Line before CHECK-FOR-UPDATES works");


autoUpdater.checkForUpdatesAndNotify();

// setInterval(() => {
//   autoUpdater.checkForUpdates()
// }, 60000)





autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
  console.log("update-available");

});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
  console.log("update-downloaded");
});

autoUpdater.on('download-progress', (progressObj) => {

  let log_message = ' Downloaded ' + progressObj.percent + '%';
  
    // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  
    // sendStatusToWindow(log_message);
  
    // mainWindow.webContents.send('update_downloaded');
  
  mainWindow.webContents.send('message', log_message);
  
  
  
})



ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});




