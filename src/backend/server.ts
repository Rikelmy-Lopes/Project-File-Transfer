import { IpcMain } from 'electron';
import app from './app';
import ip from 'ip';
const PORT = 3000;
import { Server } from 'http'
let server: Server | null = null;

function serverHandler(ipcMain: IpcMain) {
  ipcMain.on('start-server', () => {
    if (!server) {
      server = app.listen(PORT, ip.address(), () => {
        console.log(`Servidor iniciado em http://${ip.address()}:${PORT}/`);
      });
    }
  
  });
  
  ipcMain.on('stop-server', () => {
    if (server && server.listening) {
      server.closeAllConnections();
      server.close((error) => {
        server = null;
        if(error) {
          console.log(error);
          return;
        }
        console.log('Server closed');
      });
      server = null;
    }
  });
}

export default serverHandler;
