import { useState } from "react"

const MainWindow = () => {
  const [displayAddress, setDisplayAddress] = useState(false);

  const startServer = () => {
    window.ipcRenderer.send('start-server');
    setDisplayAddress(true)
  }

  const closeServer = () => {
    window.ipcRenderer.send('stop-server');
    setDisplayAddress(false);
  }

  const openLinkInBrowser = async (): Promise<void> => {
    await window.shell.openExternal(`http://${window.ip.address()}:3000`)
  }

  return(
    <div>
      <button onClick={startServer} >
            Start Server
      </button>
      <button onClick={closeServer}>
            Stop Server
      </button>
      <h2>Digite esse link no navegador: </h2>
      {
        displayAddress ? (<button onClick={openLinkInBrowser}>{`http://${window.ip.address()}:3000`}</button>) : null
      }
    </div>
  )
}

export default MainWindow;