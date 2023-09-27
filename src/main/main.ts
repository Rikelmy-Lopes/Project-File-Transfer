import { App, app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import expressApp from '../server/app';
import { ServerHandler } from '../server/server';
import { state } from '../state/state';
import { IObserver, ISubject, StateSubject } from '../state/StateSubject';

const isDev = process.env.NODE_ENV === 'development';

class MainWindow {
  private window: BrowserWindow | null;
  private app: App;
  private serverHandler: IObserver;
  private subject: ISubject;

  constructor(app: App, serverHandler: IObserver, subject: ISubject) {
    this.app = app;
    this.serverHandler = serverHandler;
    this.subject = subject;
  }

  main() {
    try {
      this.startup();
    } catch (error) {
      console.error((error as Error).message);
      app.exit(1);
    }
  }

  private startup() {
    app.whenReady().then(() => {
      this.app.on('window-all-closed', this.onWindowAllClosed);
      this.app.on('second-instance', this.onSecondInstance);
      this.app.on('activate', this.onActivate);
      this.createWindow();
      this.onServer();
    });
  }

  private createWindow() {
    this.window = new BrowserWindow({
      title: 'Main window',
      width: 1024,
      height: 768,
      webPreferences: {
        preload: join(__dirname, '../preload/preload.js'),
        nodeIntegration: true,
      }
    });
    if (isDev) {
      this.window.loadURL('http://localhost:5173');
      this.window.webContents.openDevTools();
    } else {
      this.window.removeMenu();
      this.window.loadFile(join(__dirname, '../renderer/index.html'));
    }
  }

  private onWindowAllClosed() {
    this.window = null;
    if (process.platform !== 'darwin') app.quit();
  }

  private onSecondInstance() {
    if (this.window) {
      // Focus on the main window if the user tried to open another
      if (this.window.isMinimized()) this.window.restore();
      this.window.focus();
    }
  }

  private onActivate() {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
      allWindows[0].focus();
    } else {
      this.main();
    }
  }

  private onServer() {
    this.subject.subscribe(this.serverHandler);
    ipcMain.on('start-server', (_, serverPort: number) => {
      state.isServerOn = true;
      state.serverPort = serverPort;
      this.subject.notifyAll(state);
    });
    ipcMain.on('stop-server', () => {
      state.isServerOn = false;
      this.subject.notifyAll(state);
    });
  }

}

const serverHandler = new ServerHandler(expressApp);
const stateSubject = new StateSubject();

const main = new MainWindow(app,serverHandler, stateSubject);

main.main();