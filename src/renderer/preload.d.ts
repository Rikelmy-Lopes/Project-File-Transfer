import { IpcRenderer, Shell } from 'electron';

// declare the variables coming from preload.cjs of electron
declare global {
    interface Window {
      ipcRenderer: IpcRenderer,
      ip: any,
      shell: Shell,
    }
  }

export {};