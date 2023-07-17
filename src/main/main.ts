import  { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import serverHandler from '../backend/server'

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(1)
}

const isDev = process.env.NODE_ENV === 'development';

let win : BrowserWindow | null = null;;

async function createWindow () {
  win = new BrowserWindow({
    title: 'Main window',
    width: 1024,
    height: 768,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      nodeIntegration: true,
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(createWindow)

serverHandler(ipcMain)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})