const app = require('./app.js');
const ip =  require('ip');
const PORT = 3000;
let server  = null;

function serverHandler(ipcMain) {
  ipcMain.on('start-server', () => {
    if (!server || !server.listening) {
      server = app.listen(PORT, ip.address(), () => {
        console.log(`Servidor iniciado em http://${ip.address()}:${PORT}/`);
      });
    }
    
  
  });
  
  ipcMain.on('stop-server', () => {
    if (server && server.listening) {
      server.close();
      console.log('Server Closed');
      server = null;
      process.exit(0);
    }
  });
}

module.exports = serverHandler;

// app.listen(PORT, ip.address(), () => {
//   console.log(`Servidor iniciado em http://${ip.address()}:${PORT}/`);
// });
