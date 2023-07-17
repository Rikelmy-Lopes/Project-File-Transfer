/* eslint-disable no-undef */
import express from 'express';
import path from 'path';
import os from 'os';
import { readDirectory } from './utils/directoryHandle';
import cors from 'cors';

const app = express()


app.use(cors({
  origin: '*'
}));

app.use(express.static(os.homedir()));
app.use(express.static(path.join(__dirname, '../app')));


//pega os arquivos por diretorio
app.get('/files-list/:caminho', async (req, res) => {
  const { caminho } = req.params;
  const completePath = path.join(os.homedir(), caminho);
  try {
    const entriesList = (await readDirectory(completePath))
      .map(entry => ({...entry, name: `${caminho}/${entry.name}`}));
    
    res.status(200).send(entriesList);
  } catch (error: unknown) {
    res.status(400).send(error instanceof Error ? error.message : 'Error');
  }
});

app.get('/files-list', async (_req, res) => {
  try {
    const entriesList = await readDirectory(os.homedir());
    res.status(200).send(entriesList);
  } catch (error: unknown) {
    res.status(400).send(error instanceof Error ? error.message : 'Error');
  }
});

app.get('/:caminho', (_req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});



app.get('/download/:caminho', (req, res) => {
  const { caminho } = req.params;
  const completePath = path.join(os.homedir(), caminho);
  res.download(completePath, completePath, { dotfiles: 'allow' }, (error) => {
    if(error && error.message !== 'Request aborted') {
      res.status(400).send('Error: ' + error.message);
    }
  });
});


  
export default app;