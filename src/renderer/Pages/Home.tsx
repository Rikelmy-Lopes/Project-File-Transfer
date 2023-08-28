import axios from 'axios';
import { useEffect, useState } from 'react';
import Entry from '../Components/Entry';
import { IEntry, IUser } from '../Interfaces/Interfaces';
import './Home.css';
import arrowLeft from '/images/arrow-left.png';
import arrowRight from '/images/arrow-right.png';

const Home = (): JSX.Element => {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [user, setUser] = useState<IUser>();

  const getEntriesList = async (): Promise<void> => {
    const path = location.pathname;
    try {
      const { data } = await axios.get<IEntry[]>(`/files-list${path}`);
      setEntries(data);
    } catch(error) {
      console.log(error);
    }
  };

  const getUserInfo = async (): Promise<void> => {
    try {
      const { data } = await axios.get<IUser>('/user');
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
    getEntriesList();
  }, []);

  useEffect(() => {
    document.title =  `PC: ${user?.username || 'Loading...'}`;
  }, [user]);
    
  return (
    <>
      <h2>
            Diretório Atual: { decodeURIComponent(location.pathname) }?
      </h2>
      <button className="arrow-button" 
        onClick={() => location.pathname !== '/' ? window.history.back() : null } >
        <img src={arrowLeft} alt="" />
      </button>
      <button className="arrow-button" onClick={() => window.history.forward() } >
        <img src={arrowRight} alt="" />
      </button>
      <ul id="file-list">
        {
          entries.map((entry) => <Entry key={entry.name} entry={entry} />)
        }
      </ul>
    </>
  );
};

export default Home;