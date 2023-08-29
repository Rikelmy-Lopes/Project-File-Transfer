import { IpcMain } from 'electron';
import { Server } from 'http';
import ip from 'ip';
import app from './app';
let server: Server | null = null;

function serverHandler(ipcMain: IpcMain) {
  ipcMain.on('start-server', (_, port: number) => {
    if (!server) {
      server = app.listen(port, ip.address(), () => {
        console.log(`Servidor iniciado em http://${ip.address()}:${port}`);
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
