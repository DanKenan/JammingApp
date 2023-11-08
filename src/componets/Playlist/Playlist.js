import { useState, useEffect } from "react";
import styles from './playlist.module.css';
import Spotify from "../../Spotify/Spotify";
import { convertToMinSec } from '../TrackList/TrackList';
import { BiLibrary, BiVerticalBottom, BiVerticalTop } from "react-icons/bi";

export default function Playlist() {

  const [playlists, setPlaylists] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState([])

  useEffect(() => {
    Spotify.getPlaylists().then((data) => {
      setPlaylists(data);
    });
  }, []);

  //handeling opening and closing of a playlist display
  const handleShow = (playlistId) => {
    if (showPlaylist.includes(playlistId)) {
      setShowPlaylist(showPlaylist.filter((id) => id !== playlistId));
    } else {
      setShowPlaylist([...showPlaylist, playlistId]);
    }
  }



  return (
    <>
      <h2 className={styles.playlist_header}>
        <BiLibrary /> Your Library:
      </h2>
  
      <div className={styles.playlist}>
        <ul className={styles.playlist_list}>
          {playlists? (playlists.map((playlist) => (
            <li key={playlist.playlist.id}>
              <div className={styles.container}>
                <div className={styles.playlist_show_info}>
                  <img src={playlist.playlist.image} alt="" className={styles.playlist_img} />
                  <h3 className={styles.playlist_name}>{playlist.playlist.name}</h3>
                </div>

                {/*handeling opening and closing of a playlist display*/}
                <div className={styles.show_playlist}>
                  {showPlaylist.length > 0 ? (
                    <BiVerticalTop onClick={() => handleShow(playlist.playlist.id)} />
                  ) : (
                    <BiVerticalBottom onClick={() => handleShow(playlist.playlist.id)} />
                  )}
                </div>
                
                {/*showing the tracks inside a selected playlist*/}
              </div>
              <ul key={`tracks-${playlist.playlist.id}`} className={styles.track_list}>
                {showPlaylist.includes(playlist.playlist.id) &&
                  playlist.tracks.map((track) => (
                    <li key={track.id} className={styles.playlist_track_container}>
                      <div className={styles.container_col}>
                        <img src={track.image} alt="" className={styles.playlist_track_img} />
                        <span>{track.name}</span>
                      </div>
                      <div className={styles.playlist_track_info}>
                        <span>{track.artist}</span>
                        <span>{track.album}</span>
                        <span>{convertToMinSec(track.duration)}</span>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))) : (
            <div>
              <p>Created your first playlist</p>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}  
