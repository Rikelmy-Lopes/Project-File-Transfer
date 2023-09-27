import { Application } from 'express';
import { Server } from 'http';
import ip from 'ip';
import { IObserver } from '../State/StateSubject';
import { IState } from '../State/state';


export class ServerHandler implements IObserver {
  private app: Application;
  private server: Server | null;

  constructor(expressApp: Application) {
    this.app = expressApp;
    this.server = null;
    
  }

  update(state: IState): void {
    if (state.isServerOn) {
      this.start(state);
    } else {
      this.stop();
    }
  }

  private start(state: IState) {
    if (!this.server) {
      this.server = this.app.listen(state.serverPort, ip.address(), () => {
        console.log(`Servidor iniciado em http://${ip.address()}:${state.serverPort}`);
      });
    }
  }

  private stop() {
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
  }

}

