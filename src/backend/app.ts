/* eslint-disable no-undef */
import express from 'express';
import { join } from 'path';
import { readDirectory, getUserHomedir } from './utils/directoryHandle';

const app = express()

app.use(express.static(getUserHomedir()));
app.use(express.static(join(__dirname, '../app')));


//pega os arquivos por diretorio
app.get('/files-list/:caminho', async (req, res) => {
  const { caminho } = req.params;
  const completePath = join(getUserHomedir(), caminho);
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
    const entriesList = await readDirectory(getUserHomedir());
    res.status(200).send(entriesList);
  } catch (error: unknown) {
    res.status(400).send(error instanceof Error ? error.message : 'Error');
  }
});

app.get('/:caminho', (_req, res) => {
  res.sendFile(join(__dirname, '../app/index.html'));
});

app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, '../app/index.html'));
});



app.get('/download/:caminho', (req, res) => {
  const { caminho } = req.params;
  const completePath = join(getUserHomedir(), caminho);
  res.download(completePath, completePath, { dotfiles: 'allow' }, (error) => {
    if(error && error.message !== 'Request aborted') {
      res.status(400).send('Error: ' + error.message);
    }
  });
});


  
export default app;