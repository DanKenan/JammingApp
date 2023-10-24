import React from "react";
import styles from './TrackList.module.css';

export default function TrackList ({ selectedOptions }) {

        if (!selectedOptions || selectedOptions.length === 0) {
            return (
                <div className={styles.container}>
                    <h1>Track List</h1>
                    <p>No options selected</p>
                </div>
            );
        }
    
        return (
            <div className={styles.container}>
                <h1>Track List</h1>
                <ul>
                    {selectedOptions.map((option) => (
                        <li className={styles.trackList} key={option.id}>
                        <img className={styles.trackImages} src={option.image} alt=""/>
                        <div className={styles.trackDetails}>
                         <p className={styles.trackInfo}>{option.artist}</p>
                         <p className={styles.trackInfo}>{option.name}</p>
                         <p className={styles.trackInfo}>{option.album}</p>
                        </div>
                         </li>
                    ))}
                </ul>
            </div>
        );
    }
    
        
