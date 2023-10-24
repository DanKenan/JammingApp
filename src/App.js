import React, { useState, useEffect } from 'react';
import './CSS/app.css';
import SearchBar from './componets/SearchBar/SearchBar'; // Ensure that the path to your components is correct
import NavBar from './componets/NavBar/NavBar';
import TrackList from './componets/TrackList/TrackList';
import Spotify from './Spotify/Spotify';

function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectedOptions = (selected) => {
    if (selected.length > 0) {
      Spotify.search(selected).then((searchResults) => {
        setSelectedOptions(searchResults);
      });
    }
  };

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      <header className='hero'>
        <NavBar />
      </header>
      <main>
        <section>
          <SearchBar onSelectedOptions={handleSelectedOptions} searchResults={selectedOptions} />
        </section>
        <section>
          <TrackList selectedOptions={selectedOptions} />
        </section>
      </main>
    </>
  );
}

export default App;
