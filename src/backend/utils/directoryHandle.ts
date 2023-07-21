import { readdir } from 'fs';
import { parseEntriesList } from './entriesListHandle';
import { homedir } from 'os'

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
}

export { readDirectory, getUserHomedir };