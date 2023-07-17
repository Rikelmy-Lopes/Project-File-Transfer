const { spawn } =  require('child_process');

spawn('npm', ['run', 'build:renderer'], { stdio: 'inherit' });
spawn('npm', ['run', 'build:vite:app'], { stdio: 'inherit' });
spawn('npm', ['run', 'transpile:electron'], { stdio: 'inherit' });