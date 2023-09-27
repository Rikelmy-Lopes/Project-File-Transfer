import { BrowserRouter } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import MainWindow from './Pages/MainWindow';


function App() {

  return window.ipcRenderer ? <MainWindow /> : <BrowserRouter> <MainPage /> </BrowserRouter> ;
}

export default App;
