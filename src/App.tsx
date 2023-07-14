import './App.css'
import Home from './Pages/Home'
import MainWindow from './Pages/MainWindow';
import { IpcRenderer, Shell } from 'electron'


// declare the variables coming from preload.cjs of electron
declare global {
    interface Window {
      ipcRenderer: IpcRenderer,
      ip: any,
      shell: Shell
    }
}

function App() {

  return window.ipcRenderer ? <MainWindow /> : <Home />;
}

export default App;
