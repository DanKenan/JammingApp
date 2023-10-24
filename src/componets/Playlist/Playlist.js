import React from "react";
import styles from './playlist.module.css';

export default function Playlist(props) {
  const artistList = props.addSongs.map((object, index) => {
    const valueArray = Object.values(object);
    const firstValue = valueArray[0];
    const { value } = firstValue;

    return (
      <li key={index}>
        <strong>Artist:</strong> {value}
      </li>
    );
  });

  return (
    <div className={styles.playlist}>
      <h1>Playlist Songs:</h1>
      <ul>
        {artistList}
      </ul>
    </div>
  );
}
