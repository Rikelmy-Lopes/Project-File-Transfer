import { IEntry } from '../Interfaces/Interfaces';
import imageFile from '/images/file.png';
import imageFolder from '/images/folder.png';

const Entry = ({ entry }: { entry: IEntry }): JSX.Element => {
  
  const handleHref = (): string => {
    if (entry.isDirectory) {
      return `/?path=${encodeURIComponent(entry.name)}`;
    }
    return `/download/${encodeURIComponent(entry.name)}`;
  };

  return (
    <li>
      <img 
        className="entry-icon" 
        src={ entry.isDirectory ? imageFolder : imageFile } 
        alt="Entry Icon" 
      />
      <a 
        href={ handleHref() }
      >
        { entry.name.split('/').pop() }
      </a>
    </li>
  );
};

export default Entry;