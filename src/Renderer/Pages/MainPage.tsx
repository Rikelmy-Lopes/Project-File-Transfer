import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IUser } from '../Interfaces/Interfaces';
import Home from './Home';
import './MainPage.css';
import arrowLeft from '/images/arrow-left.png';
import arrowRight from '/images/arrow-right.png';

const MainPage = () => {
  const [path, setPath] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const getParams = (): void => {
    const path = searchParams.get('path') || '';
    setPath(path);
  };

  const getUserInfo = async (): Promise<void> => {
    document.title =  'Pc: Loading...';
    try {
      if(path === null) return;
      const { data } = await axios.get<IUser>('/user');
      document.title =  `Pc: ${data.username}`;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParams();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [path]);

  return(
    <>
      <h2>
          Diretório Atual: { path }/?
      </h2>
      <button className="arrow-button" 
        onClick={() => path !== '' ? window.history.back() : null } >
        <img src={arrowLeft} alt="" />
      </button>
      <button className="arrow-button" onClick={() => window.history.forward() } >
        <img src={arrowRight} alt="" />
      </button>
      <Home path={path} />
    </>
  );
};

export default MainPage;