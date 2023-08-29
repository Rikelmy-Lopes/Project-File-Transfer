import { Dirent } from 'fs';
import { IEntries } from './directoryHandle';

const parseEntriesList = (entriesList: Dirent[]): IEntries[]  => {
  return entriesList.map((entry) => {
    return { name: entry.name, isDirectory: entry.isDirectory() };
  });
};

const prependPathToEntryNames = (entriesList: IEntries[], path: string): IEntries[] => {
  return entriesList.map(entry => ({...entry, name: `${path}/${entry.name}`}));
}; 

export { parseEntriesList, prependPathToEntryNames };

