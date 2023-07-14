const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')
const serverHandler = require('./backend/server.cjs')

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

const isDev = process.env.NODE_ENV === 'development';

let win = null

async function createWindow () {
  win = new BrowserWindow({
    title: 'Main window',
    width: 1024,
    height: 768,
    webPreferences: {
      preload: join(__dirname, './preload.cjs'),
      nodeIntegration: true,
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(join(__dirname, './app/index.html'));
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