import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import expressApp from '../backend/app';
import { ServerHandler } from '../backend/server';
import { state } from '../backend/state/state';
import { IObserver, ISubject, StateSubject } from '../backend/state/StateSubject';

const isDev = process.env.NODE_ENV === 'development';

class MainWindow {
  private window: Electron.BrowserWindow | null;
  private serverHandler: IObserver;
  private subject: ISubject;

  constructor(serverHandler: IObserver, subject: ISubject) {
    this.window = null;
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
      this.createWindow();
      this.registerListeners();
      this.server();
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

  private registerListeners() {
    if (!app.requestSingleInstanceLock()) {
      app.quit();
      process.exit(1);
    }
    app.on('window-all-closed', () => {
      this.window = null;
      if (process.platform !== 'darwin') app.quit();
    });
    app.on('second-instance', () => {
      if (this.window) {
        // Focus on the main window if the user tried to open another
        if (this.window.isMinimized()) this.window.restore();
        this.window.focus();
      }
    });
    app.on('activate', () => {
      const allWindows = BrowserWindow.getAllWindows();
      if (allWindows.length) {
        allWindows[0].focus();
      } else {
        this.main();
      }
    });
  }

  private server() {
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

const main = new MainWindow(serverHandler, stateSubject);

main.main();