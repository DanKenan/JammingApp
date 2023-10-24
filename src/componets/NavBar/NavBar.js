import React from 'react';
import logo from '../../pictures/logo2.png';
import styles from './NavBar.module.css'
import Spotify from '../../Spotify/Spotify';

export default function NavBar() {

    const handleLoginClick = () => {
        const accessToken = Spotify.getAccessToken();
        if (accessToken) {
          // If you have a valid access token, you can perform actions here
          console.log('User is logged in');
        } else {
          // User is not logged in, initiate the login process
          console.log('User needs to log in');
        }
      };

    return(
        <nav className={styles.row}>
          <img className={styles.logo} src={logo} alt='company logo'/>
           <ul className={styles.row}>
            <li><a className={styles.btn} >Log in</a></li>
            <li><a href='#' className={styles.btn} onClick={handleLoginClick}>Sign up</a></li>
           </ul>
        </nav>
    )
};