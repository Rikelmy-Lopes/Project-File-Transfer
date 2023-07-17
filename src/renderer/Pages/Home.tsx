
import { useEffect, useState } from "react";
import Entry from "../Components/Entry";
import axios from "axios";
import { IEntry } from "../Interfaces/Interfaces";
import arrowLeft from '/images/arrow-left.png'
import arrowRight from '/images/arrow-right.png'

const Home = () => {
  const [ entries, setEntries ] = useState<IEntry[]>([]);

  const getEntriesList = async (): Promise<void> => {
    const path = location.pathname;
    try {
      const { data } = await axios.get<IEntry[]>(`/files-list${path}`);
      setEntries(data)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    void getEntriesList();
  }, [])
    
  return (
    <>
      <h2>
            Diretório Atua: { decodeURIComponent(location.pathname) }?
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
  )
}

export default Home;