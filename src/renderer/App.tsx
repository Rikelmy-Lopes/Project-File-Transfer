import React from 'react';
import Home from './Pages/Home';
import MainWindow from './Pages/MainWindow';


function App() {

  return window.ipcRenderer ? <MainWindow /> : <Home />;
}

export default App;
