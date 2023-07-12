const fs = require('fs');
const { parseEntriesList } = require('./entriesListHandle');

const readDirectory = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, { withFileTypes: true },  (err, entries) => {
      if (err) {
        reject(new Error('Erro ao ler o Diretório'));
      } else {
        resolve(parseEntriesList(entries));
      }
    });
  });
};

module.exports =  { readDirectory };