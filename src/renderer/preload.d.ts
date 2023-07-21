import { IpcRenderer, Shell } from 'electron';zz;
import ip from 'ip';

// declare the variables coming from preload.cjs of electron
declare global {
    interface Window {
      ipcRenderer: IpcRenderer,
      ip: typeof ip,
      shell: Shell,
    }
  }

export {};