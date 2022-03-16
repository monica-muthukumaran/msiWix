// ./build_installer.js
// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');
// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64", 
const APP_DIR = path.resolve(__dirname, './Final-win32-x64');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer", 
const OUT_DIR = path.resolve(__dirname, './windows_installer');
// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    // Configure metadata
    description: 'WIX Approach',
    exe: 'Final',
    name: 'final',
    manufacturer: 'Infosys',
    version: '1.0.0',
    appIconPath: path.resolve(__dirname,'icons/icon.ico'),

    // Configure installer User Interface
    ui: {
        chooseDirectory: true
        
    },
    features:{
        autoUpdate:true
    }
});
(async function(){
    // Step 2: Create a .wxs template file
    const supportBinaries = await msiCreator.create();
// 🆕 Step 2a: optionally sign support binaries if you
// sign you binaries as part of of your packaging script
    Array.from(supportBinaries).forEach(async (binary) => {     
  // Binaries are the new stub executable and optionally
  // the Squirrel auto updater.
    await signFile(binary);
    });
// Step 3: Compile the template to a .msi file
    await msiCreator.compile();
})();