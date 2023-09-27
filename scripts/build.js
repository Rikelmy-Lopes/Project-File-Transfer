const { spawn } = require('child_process');

// build for Electron Windows
spawn('npm', ['run', 'build:renderer'], { stdio: 'inherit', shell: true });
// build for Backend Assets
spawn('npm', ['run', 'build:server-assets'], { stdio: 'inherit', shell: true });
// build electron to Javascript
spawn('npm', ['run', 'build:electron'], { stdio: 'inherit', shell: true });