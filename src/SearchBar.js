import React from 'react';
import Select from 'react-select';
import './CSS/NavBar.css';

export default function SearchBar(props) {
  const songOptions = Object.keys(props.songs).map((songKey) => {
    const { artist, song, img } = props.songs[songKey];
  return {
    value: `${artist} - ${song}`,
    label: `${artist} - ${song}`,
    image: img,
  };
})
;


      /*const songOptions = [
        { value: `${songsCheck.song1.artist} - ${songsCheck.song1.song}`, label: `${songsCheck.song1.artist} - ${songsCheck.song1.song}`, image: songsCheck.song1.img },
        { value: `${songsCheck.song2.artist} - ${songsCheck.song2.song}`, label: `${songsCheck.song2.artist} - ${songsCheck.song2.song}`, image: songsCheck.song2.img },
        { value: `${songsCheck.song3.artist} - ${songsCheck.song3.song}`, label: `${songsCheck.song3.artist} - ${songsCheck.song3.song}`, image: songsCheck.song3.img }
      ];*/
    
      const CustomOption = ({ innerProps, label, data }) => (
        <div {...innerProps} className='custom-option'>
          <img src={data.image} alt="" className="navImage" />
          <span className='song-label'>{label}</span>
        </div>
      );
  
  return (
    <form>
      <h3 className='heading'>Jewish Music</h3>
      <div className='Image'></div>
      <label htmlFor="songName" className='formText'>Start your search</label>
      <Select
        options={songOptions}
        placeholder="Song name"
        components={{ Option: CustomOption }}
      />
 
    </form>
  );
  }

