import { contextBridge, shell } from 'electron';
import electron from 'electron';
import ip from 'ip';


contextBridge.exposeInMainWorld('ipcRenderer', electron.ipcRenderer);
contextBridge.exposeInMainWorld('ip', ip);
contextBridge.exposeInMainWorld('shell', shell);