const { spawn } = require('child_process')
const electron = require('electron');

// start vite on development mode
spawn('npm', ['run', 'dev:vite'], { stdio: 'inherit', })
// build electron to Javascript
spawn('npm', ['run', 'build:electron'], { stdio: 'inherit' }).once('close', () => {
    // start electron
    spawn(electron, ['.'], { stdio: 'inherit' });
})




