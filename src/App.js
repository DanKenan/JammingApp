import React from 'react';
import  './CSS/app.css';
import SearchBar from './SearchBar';
import songData from './Data';

function App() {
  return (
        <div>
          <header>
            <h1>JVibeSpot</h1>
            <h2>Discover the Vibrant Rhythms of Jewish Music!</h2>
          </header>
          <main className='pic'>
            <SearchBar songs = {songData}/>
          </main>
        </div>

  );
}

export default App;

