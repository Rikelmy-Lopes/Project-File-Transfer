const { spawn } = require('child_process')
const { createServer } =  require('vite')
const electron = require('electron');

createServer({ configFile: 'electron.vite.config.ts' })
    .then((server) => server.listen());

spawn('npm', ['run', 'watch'], { stdio: 'inherit' });

spawn('npm', ['run', 'transpile:electron'], { stdio: 'inherit' }).once('close', () => {
    spawn(electron, ['.'], { stdio: 'inherit' });
})




