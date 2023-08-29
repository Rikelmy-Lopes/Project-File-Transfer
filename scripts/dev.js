const { spawn } = require('child_process')
const { createServer } =  require('vite')
const electron = require('electron');

spawn('npm', ['run', 'dev:vite'], { stdio: 'inherit', })

// spawn('npm', ['run', 'watch'], { stdio: 'inherit', });

spawn('npm', ['run', 'transpile:electron'], { stdio: 'inherit' }).once('close', () => {
    spawn(electron, ['.'], { stdio: 'inherit' });
})




