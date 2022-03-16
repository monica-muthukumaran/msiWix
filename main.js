const { app, BrowserWindow,ipcMain } = require('electron')
const remoteMain = require("@electron/remote/main");
// const electronInstaller = require('electron-winstaller');
const { autoUpdater } = require('electron-updater');
// import { MSICreator } from 'electron-wix-msi';





// if (handleSquirrelEvent(app)) {
//   // squirrel event handled and app will exit in 1000ms, so don't do anything else
//   return;
//   }


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




// function handleSquirrelEvent(application) {
//   if (process.argv.length === 1) {
//   return false;
//   }
//   const ChildProcess = require('child_process');
//   const path = require('path');
//   const appFolder = path.resolve(process.execPath, '..');
//   const rootAtomFolder = path.resolve(appFolder, '..');
//   const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
//   const exeName = path.basename(process.execPath);
//   const spawn = function(command, args) {
//   let spawnedProcess, error;
//   try {
//   spawnedProcess = ChildProcess.spawn(command, args, {
//   detached: true
//   });
//   } catch (error) {}
//   return spawnedProcess;
//   };
//   const spawnUpdate = function(args) {
//   return spawn(updateDotExe, args);
//   };
//   const squirrelEvent = process.argv[1];
//   switch (squirrelEvent) {
//   case '--squirrel-install':
//   case '--squirrel-updated':
//   // Optionally do things such as:
//   // - Add your .exe to the PATH
//   // - Write to the registry for things like file associations and
//   //   explorer context menus
//   // Install desktop and start menu shortcuts
//   spawnUpdate(['--createShortcut', exeName]);
//   setTimeout(application.quit, 1000);
//   return true;
//   case '--squirrel-uninstall':
//   // Undo anything you did in the --squirrel-install and
//   // --squirrel-updated handlers
//   // Remove desktop and start menu shortcuts
//   spawnUpdate(['--removeShortcut', exeName]);
//   setTimeout(application.quit, 1000);
//   return true;
//   case '--squirrel-obsolete':
//   // This is called on the outgoing version of your app before
//   // we update to the new version - it's the opposite of
//   // --squirrel-updated
//   application.quit();
//   return true;
//   }
//   };