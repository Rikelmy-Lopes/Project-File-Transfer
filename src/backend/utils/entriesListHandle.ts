import { Dirent } from 'fs'
import { IEntries } from './directoryHandle';

const parseEntriesList = (entriesList: Dirent[]): IEntries[]  => {
  return entriesList.map((entry) => {
    return { name: entry.name, isDirectory: entry.isDirectory() };
  });
};

export { parseEntriesList };