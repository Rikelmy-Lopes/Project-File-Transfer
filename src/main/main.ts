import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import expressApp from '../backend/app';
import { IServerHandler, ServerHandler } from '../backend/server';

const isDev = process.env.NODE_ENV === 'development';

class MainWindow {
  private app: Electron.App
  private ipcMain: Electron.IpcMain
  private window: Electron.BrowserWindow | null;
  private serverHandler: IServerHandler

  constructor(app: Electron.App, ipcMain: Electron.IpcMain, serverHandler: IServerHandler) {
    this.app = app;
    this.ipcMain = ipcMain;
    this.window = null;
    this.serverHandler = serverHandler;
    this.init();
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
    })
    if (isDev) {
      this.window.loadURL('http://localhost:5173');
      this.window.webContents.openDevTools();
    } else {
      this.window.removeMenu();
      this.window.loadFile(join(__dirname, '../renderer/index.html'));
    }
  }

  private setListeners() {
    if (!app.requestSingleInstanceLock()) {
      app.quit()
      process.exit(1)
    }
    this.serverHandler.start(this.ipcMain);
    this.serverHandler.stop(this.ipcMain);
    this.app.on('window-all-closed', () => {
      this.window = null;
      if (process.platform !== 'darwin') this.app.quit()
    })
    app.on('second-instance', () => {
      if (this.window) {
        // Focus on the main window if the user tried to open another
        if (this.window.isMinimized()) this.window.restore()
        this.window.focus()
      }
    })
    app.on('activate', () => {
      const allWindows = BrowserWindow.getAllWindows()
      if (allWindows.length) {
        allWindows[0].focus()
      } else {
        this.init();
      }
    })
  }

  private init() {
    this.app.whenReady().then(() => {
      this.createWindow();
      this.setListeners();
    });
  }
  
}

const serverHandler = new ServerHandler(expressApp)

new MainWindow(app, ipcMain, serverHandler);