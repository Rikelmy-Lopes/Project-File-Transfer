const app = require('./app.cjs');
const ip =  require('ip');
const PORT = 3000;
let server = null;

function serverHandler(ipcMain) {
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

module.exports = serverHandler;
