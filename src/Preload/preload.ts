import { contextBridge, shell } from 'electron';
import { ipcRenderer } from 'electron';
import ip from 'ip';


contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
contextBridge.exposeInMainWorld('ip', ip);
contextBridge.exposeInMainWorld('shell', shell);