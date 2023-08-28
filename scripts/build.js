const { spawn } =  require('child_process');

spawn('npm', ['run', 'build:renderer'], { stdio: 'inherit', shell: true });
spawn('npm', ['run', 'build:vite:backend'], { stdio: 'inherit', shell: true });
spawn('npm', ['run', 'transpile:electron'], { stdio: 'inherit', shell: true });