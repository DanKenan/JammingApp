import React, { useState } from 'react';
import './CSS/app.css';
import SearchBar from './componets/SearchBar/SearchBar'; // Ensure that the path to your components is correct
import NavBar from './componets/NavBar/NavBar';
import TrackList from './componets/TrackList/TrackList';
import PlayList from './componets/Playlist/Playlist';
import { HiMiniHome } from "react-icons/hi2";
import { BiSearchAlt } from "react-icons/bi";

function App() {
  const [displayOption, setdisplayOption] = useState('home');
  const [searchResults, setSearchResults] = useState()
  
  return (
  <>
    <div className='app_container'>
      <header className='hero'>
        <NavBar />
        {/*<section>
      <div className='introduction'>
          <h1 className='introduction_header'>CONNECT TO THE BEATS</h1>
          <p className='introduction_text'> Connect to your favorite online music platform and Search, Listen 
            <br />and Create a playlist from only Jewsih Singers and Yiddishe Music.
            <br />
            <span className='introduction_span'>Find what you love and protect what you belive.</span>
          </p>
        </div>
  </section>*/}
      </header>

      <div className='container'>
      <aside className='sidebar'>
        <div className='display_side'> 
          <button type='button' className='btn_nav' onClick={() => setdisplayOption('home')}>
            <HiMiniHome /> Home
          </button>
          <button type='button' className='btn_nav' onClick={() => setdisplayOption('search')}>
            <BiSearchAlt /> Search
          </button>
        </div>
        
        <PlayList />
      </aside>
      <main className='main_content'>
        <section>
          {displayOption === 'search' &&(
            <SearchBar  getSearchResults={setSearchResults} />)  
            }
        </section>
        <section className='track_list'>
          {displayOption === 'search' &&
          (<TrackList searchResults={searchResults} />)
          }
        </section> 
      </main>

      </div>
    </div>
  </>

  );
}

export default App;
