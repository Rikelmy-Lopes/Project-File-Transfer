/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const os = require('os');
const { readDirectory } = require('./Utils/directoryHandle');

const app = express();

app.use(express.static(os.homedir()));
app.use(express.static(path.join(__dirname, 'Page')));
app.use(express.static(path.join(__dirname, 'Images')));



//pega os arquivos por diretorio
app.get('/files-list/:caminho', async (req, res) => {
  let { caminho } = req.params;
  const completePath = path.join(os.homedir(), caminho);
  try {
    const entriesList = (await readDirectory(completePath))
      .map(entry => ({...entry, name: `${caminho}/${entry.name}`}));
    
    res.status(200).send(entriesList);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/files-list', async (_req, res) => {
  try {
    const entriesList = await readDirectory(os.homedir());
    res.status(200).send(entriesList);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/:caminho', (req, res) => {
  res.sendFile(path.join(__dirname, 'Page', 'home.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Page', 'home.html'));
});

app.get('/download/:caminho', (req, res) => {
  const { caminho } = req.params;
  const completePath = path.join(os.homedir(), caminho);
  res.download(completePath, { dotfiles: 'allow' }, (error) => {
    if(error && error.message !== 'Request aborted') {
      res.status(400).send('Error: ' + error.message);
    }
  });
});


  
module.exports = app;