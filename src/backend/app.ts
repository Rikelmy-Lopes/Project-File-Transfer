/* eslint-disable no-undef */
import express from 'express';
import { userInfo } from 'os';
import { join } from 'path';
import { getUserHomedir, readDirectory } from './utils/directoryHandle';

const app = express()

app.use(express.static(getUserHomedir()));
app.use(express.static(join(__dirname, 'public')));
app.use(express.json())


app.get('/user', (_req, res) => {
  res.status(200).json({ username: userInfo().username })
});

//pega os arquivos por diretorio
app.get('/files-list/:caminho', async (req, res) => {
  const { caminho } = req.params;
  const completePath = join(getUserHomedir(), caminho);
  try {
    const entriesList = (await readDirectory(completePath))
      .map(entry => ({...entry, name: `${caminho}/${entry.name}`}));
    
    res.status(200).send(entriesList);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

app.get('/files-list', async (_req, res) => {
  try {
    const entriesList = await readDirectory(getUserHomedir());
    res.status(200).send(entriesList);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

app.get('/*', (_req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
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


  
export default app;