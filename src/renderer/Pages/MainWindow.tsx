import React, { ChangeEvent, useState } from 'react';
import './MainWindow.css';

const MainWindow = (): JSX.Element => {
  const [isServerOn, setIsServerOn] = useState<boolean>(false);
  const [isPortInRange, setIsPortInRange] = useState<boolean>(true);
  const [port, setPort] = useState<string>('1024');

  const changePort = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setPort(value);
    if (Number(value) >= 1024 && Number(value) <= 49151) {
      setIsPortInRange(true);
    } else {
      setIsPortInRange(false);
    }
  };

  const displayServerAddress = (): JSX.Element | null => {
    if (isServerOn) {
      return (<div className='address-card' >
        <h4>Clique abaixo para abrir o link no Navegador: </h4>
        <button onClick={openLinkInBrowser}>{`http://${window.ip.address()}:${port}`}</button>
      </div>);
    }
    return null;
  };

  const startServer = (): void => {
    window.ipcRenderer.send('start-server', port);
    setIsServerOn(true);
  };

  const closeServer = (): void => {
    window.ipcRenderer.send('stop-server');
    setIsServerOn(false);
  };

  const openLinkInBrowser = async (): Promise<void> => {
    await window.shell.openExternal(`http://${window.ip.address()}:${port}`);
  };

  return(
    <div className='main'>
      <div className='server-buttons-card'>
        <button
          className='server-button'
          onClick={startServer}
          disabled={isPortInRange === false}
        >
            Start Server
        </button>
        <button 
          className='server-button'
          onClick={closeServer}>
            Close Server
        </button>
      </div>
      <div className='port-card'>
        <label htmlFor="port">Porta:</label>
        <input
          disabled={isServerOn}
          value={port}
          onChange={changePort}
          id='port' 
          type="number" />
      </div>
      {
        isPortInRange ? null : <p> A porta deve estar entre 1024 e 49151 </p>
      }
      {
        displayServerAddress()
      }
    </div>
  );
};

export default MainWindow;