import { readdir } from 'fs';
import { homedir } from 'os';
import { parseEntriesList } from './entriesListHandle';

export interface IEntries {
  name: string,
  isDirectory: boolean,
}

const readDirectory = async (path: string): Promise<IEntries[]> => {
  return new Promise((resolve, reject) => {
    readdir(path, { withFileTypes: true },  (err, entries) => {
      if (err) {
        reject(new Error('Erro ao ler o Diretório'));
      } else {
        resolve(parseEntriesList(entries));
      }
    });
  });
};

const getUserHomedir = (): string => {
  return homedir();
};

export { getUserHomedir, readDirectory };
