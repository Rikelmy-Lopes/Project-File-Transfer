const { spawn } =  require('child_process');

spawn('npm', ['run', 'vite:electron:build'], { stdio: 'inherit' });
spawn('npm', ['run', 'vite:app:build'], { stdio: 'inherit' });
spawn('npm', ['run', 'electron:js'], { stdio: 'inherit' });