import React, { useState, useEffect } from "react";
import styles from './TrackList.module.css';
import { iconButton } from 'react-icons';
import { MdAccessTime } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Spotify from "../../Spotify/Spotify";

export function convertToMinSec(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function TrackList ({ searchResults }) {
    const [selectedSong, setSelectedSong] = useState([]);
    const [playListName, setPlaylistName] = useState()
    const [songActive, setSongActive] = useState([])



//handaling adding uri of the song, to add in a playlist.
//first time that the user press on the selected song  it will add to the list. 
//second time, it will filter it out from the list.
    const handleAddSong = (uri) => {
        if (selectedSong.includes(uri)) {
            setSelectedSong(selectedSong.filter((songUri) => songUri !== uri));
          } else {
            setSelectedSong([...selectedSong, uri]);
          }
    }
    
    //lisetening to the user typing a name to the new playlist.
    const handelCreatePl = (event) => {
        setPlaylistName(event.target.value);
    }
    
    //creating playlist with provided name and songs uri.
    const handleSubmit = async () => {
        const createPl = await Spotify.savePlaylist(playListName, selectedSong)
    };

    
    //The goal is to keep a selected song on the track list, even when a new search started.
    //Same logic as before, one click, it will save in the active list, twice it will filter it out.
    const handleSongActive = (option) => {
        if (songActive.some((song) => song.id === option.id)) {
            setSongActive(songActive.filter((song) => song.id !== option.id));
        } else {
            setSongActive([...songActive, option]);
        }
    }
    
    

   //mapping the songs to render on the track list. rendering the already choosen once first and the 
   //search results that provided from the SearchBar.
   //making sure that it won't show the same song twice as active and as not active.
   let trackToMap = [];

   
   if (searchResults) {
       // Merge selected songs and search results
       trackToMap = [...songActive, ...searchResults.filter((result) => {
           return ('test:',!songActive.find((song) => song.id === result.id));
       })];
   }


    //deafault display
    if (!searchResults) {
        return (
            <div className={styles.container}>
                <h1>Track List</h1>
            </div>
        );
    }
    
    //using it for giving number for each song that being render.
    let number = 0;

    return (
        <>
        <div className={styles.container}>
            <table className={styles.track_table}>
                <thead>
                    <tr>
                        <th scope="col" >#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Album</th>
                        <th scope="col" ><MdAccessTime /></th>
                    </tr>
                </thead>
                <tbody>
                    {trackToMap
                    .map((options) => (
                        <tr key={options.id}>
                            <td>{++number}</td>
                            <td>
                                <div className={styles.title_td_con}>
                                  <img src={options.image} alt=""/>
                                   <div className={styles.title_td_info}>
                                     <span>{options.name}</span>
                                     <span>{options.artist}</span>
                                   </div>
                                </div>
                            </td>
                            <td>
                                <span>{options.album}</span>
                            </td>
                            <td>
                                <span>{typeof options.duration === 'string' ? options.duration : convertToMinSec(options.duration)}</span>
                            </td>
                            <td>
                                <iconButton
                                className={selectedSong.includes(options.uri) ? styles.icon_btn_submit : styles.icon_btn}
                                onClick={() => {
                                    handleAddSong(options.uri)
                                    handleSongActive(options)
                                }}
                                > <AiOutlinePlusCircle />
                                </iconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
          <input 
          type="text" 
          placeholder="Enter playlist name"
          value={playListName}
          onChange={handelCreatePl}
          />
          <button type="button" onClick={handleSubmit} className={styles.tooltip}>Create Playlist</button>
        </div>
    </>
    );
}

    
        
