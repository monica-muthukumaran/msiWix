const electron = require('electron');
const { BrowserWindow } =require('@electron/remote')
const { ipcRenderer } = require('electron');
const { Notification } = require('@electron/remote')



const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
const downloadButton = document.getElementById('download-button');



ipcRenderer.on('update_available', () => {
  console.log("index.js update-available");
  ipcRenderer.removeAllListeners('update_available');
  message.innerText = 'A new update is available. Downloading now...';
  ipcRenderer.on('message', function(event, text) {

    var container = document.getElementById('messages');

    // var messagess = document.createElement('p');

    container.innerHTML = text;
  });
  notification.classList.remove('hidden');
  downloadButton.classList.remove('hidden');
});
ipcRenderer.on('update_downloaded', () => {
    console.log("index.js update-downloaded");
    ipcRenderer.removeAllListeners('update_downloaded');
    message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
    restartButton.classList.remove('hidden');
    notification.classList.remove('hidden');
    console.log("myFunction")
  });


function closeNotification() {
    notification.classList.add('hidden');
  }
  function restartApp() {
    ipcRenderer.send('restart_app');
  }

let secondWindow;
console.log('Renderer Process')
const open = document.getElementById('open');
open.addEventListener('click',function(){
    secondWindow=new BrowserWindow({ height: 200,
        width: 400,webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
          }})
        console.log('Renderer Process is called')
    secondWindow.loadFile('window.html')
})

const notify=document.getElementById('notify');
const notifyMe = new Notification({title:"Custom Notification",body:"Body"});
notify.addEventListener('click', function (event) {
    console.log(Notification.isSupported());
  
    notifyMe.show();
    // notification.close();
})