import axios from 'axios';
import { useEffect, useState } from 'react';
import Entry from '../Components/Entry';
import { IEntry } from '../Interfaces/Interfaces';
import './Home.css';

interface IProps {
  path: string | null
}

const Home = ({ path }: IProps): JSX.Element => {
  const [entries, setEntries] = useState<IEntry[]>([]);

  const getEntriesList = async (): Promise<void> => {
    try {
      if (path === null) return;
      const { data } = await axios.get<IEntry[]>(`/files-list/?path=${path}`);
      setEntries(data);
    } catch(error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getEntriesList();
  }, [path]);
  
  return (
    <>
      <ul id="file-list">
        {
          entries.map((entry) => <Entry key={entry.name} entry={entry} />)
        }
      </ul>
    </>
  );
};

export default Home;