/* eslint-disable no-undef */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// let expressServer = null;
// const expressApp = require('./src/app');
// const ip = require('ip');
const serverHandler = require('./src/backend/server');

require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`),
});


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'src', 'preload.js'),
    }
  });

  win.loadFile('./src/Pages/Main/main.html');


  win.webContents.openDevTools();
}

serverHandler(ipcMain);

app.whenReady().then(() => createWindow());

