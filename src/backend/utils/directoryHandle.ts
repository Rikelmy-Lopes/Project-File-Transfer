import fs from 'fs';
import { parseEntriesList } from './entriesListHandle';

export interface IEntries {
  name: string,
  isDirectory: boolean,
}

const readDirectory = async (path: string): Promise<IEntries[]> => {
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

export { readDirectory };