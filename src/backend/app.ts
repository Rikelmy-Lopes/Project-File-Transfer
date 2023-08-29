import express from 'express';
import { createProxyServer } from 'http-proxy';
import { userInfo } from 'os';
import { join } from 'path';
import { getUserHomedir, readDirectory } from './utils/directoryHandle';
import { prependPathToEntryNames } from './utils/entriesListHandle';
const proxy = createProxyServer();
const isDev = process.env.NODE_ENV === 'development';

const app = express();

app.use(express.static(getUserHomedir()));
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());


app.get('/user', (_req, res) => {
  res.status(200).json({ username: userInfo().username });
});

//pega os arquivos por diretorio
app.get('/files-list', async (req, res) => {
  const { path } = req.query;
  const completePath = join(getUserHomedir(), path as string);
  try {
    const entriesList = await readDirectory(completePath);
    const newEntriesList = await prependPathToEntryNames(entriesList, path as string);
    res.status(200).send(newEntriesList);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});


app.get('/download/:caminho', (req, res) => {
  const { caminho } = req.params;
  const completePath = join(getUserHomedir(), caminho);
  res.download(completePath, completePath, { dotfiles: 'allow' }, (error) => {
    if(error) {
      if (res.headersSent) {
        return;
      } else {
        res.status(400).send('Error: ' + error.message);
      }
    }
  });
});


if(isDev) {
  app.get('/*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:5173/' });
  });
} else {
  app.get('/', (_req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
  });
}


export default app;