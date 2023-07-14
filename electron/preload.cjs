const { contextBridge, shell } = require('electron');
const electron = require('electron');
const ip = require('ip');


contextBridge.exposeInMainWorld('ipcRenderer', electron.ipcRenderer);
contextBridge.exposeInMainWorld('ip', ip);
contextBridge.exposeInMainWorld('shell', shell);