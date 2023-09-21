import { IpcMain } from 'electron';
import { Application } from 'express';
import { Server } from 'http';
import ip from 'ip';

export interface IServerHandler {
  start(ipcMain: IpcMain): void;
  stop(ipcMain: IpcMain): void;
}


export class ServerHandler implements IServerHandler {
  private app: Application;
  private server: Server | null;

  constructor(expressApp: Application) {
    this.app = expressApp;
    this.server = null;
  }

  public start(ipcMain: IpcMain) {
    ipcMain.on('start-server', async (_, port: number) => {
      if (!this.server) {
        this.server = this.app.listen(port, ip.address(), () => {
          console.log(`Servidor iniciado em http://${ip.address()}:${port}`);
        });
      }
    });
  }

  public stop(ipcMain: IpcMain) {
    ipcMain.on('stop-server', () => {
      if (this.server && this.server.listening) {
        this.server.closeAllConnections();
        this.server.close((error) => {
          this.server = null;
          if(error) {
            console.log(error);
            return;
          }
          console.log('Server closed');
        });
        this.server = null;
      }
    });
  }

}

