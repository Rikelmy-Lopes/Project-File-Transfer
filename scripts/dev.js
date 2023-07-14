import { spawn } from 'child_process'
import { createServer } from 'vite'
import electron from 'electron'

const server = await createServer({ configFile: 'vite.config.electron.ts' });

await server.listen();

spawn('npm', ['run', 'watch'], { stdio: 'inherit' }).once('exit', process.exit);

spawn(electron, ['.'], { stdio: 'inherit' }).once('exit', process.exit);
