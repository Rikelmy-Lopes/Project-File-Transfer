const { contextBridge } = require('electron');
const electron = require('electron');
const os = require('os');
const ip = require('ip');

contextBridge.exposeInMainWorld('ipcRenderer', electron.ipcRenderer);
contextBridge.exposeInMainWorld('os', os);
contextBridge.exposeInMainWorld('ip', ip);
