import React, { useState, useEffect } from 'react';
import logo from '../../pictures/logo2.png';
import styles from './NavBar.module.css'
import Spotify from '../../Spotify/Spotify';
import { iconButton } from 'react-icons';
import { BsSpotify } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

export default function NavBar() {

  const [isLogin, setIsLogin] = useState()
  const [userInfo, setUserInfo] = useState();

  

  useEffect(() => {
    const accessToken = Spotify.getAccessToken();
    if (accessToken) {
      Spotify.getUser().then((user) => {
        setUserInfo(user);
        setIsLogin(true);
      });
    } else {
      console.log('User needs to log in');
      setIsLogin(false);
    }
  }, []);

  const handleLogin = () => {
    // Open the Spotify login window when the user clicks the "Sign up" button
    const url =
      'https://accounts.spotify.com/en/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URI&scope=playlist-modify-public&state=STATE_STRING';
    window.open(url, 'Spotify Login', 'width=700,height=500,top=40,left=40');
  };

  const handleLogout = () => {
    const url = 'https://accounts.spotify.com/en/logout'                                                                                                                                                                                                                                                                               
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')                                                                                                
    setTimeout(() => spotifyLogoutWindow.close(), 2000)
  }

  const displayUser = userInfo ? (
    <>
      {userInfo.image.length > 0 ? (
        <>
          <img src={userInfo.image[0].url} alt={userInfo.name} />
          <span>{userInfo.name}</span>
        </>
      ) : (
        <>
          <iconButton>
            <CgProfile className={styles.btn_img} />
          </iconButton>
          <span className={styles.btn_userInfo}>{userInfo.name}</span>
        </>
      )}
    </>
  ) : null;
  

    return(
        <nav className={styles.row}>
          <img className={styles.logo} src={logo} alt='company logo'/>
           <ul className={styles.row}>
            <li>
              <a href='#' className={styles.btn}>
                {isLogin? displayUser :  (<>Sign up <BsSpotify onClick={handleLogin}/></>)}
              </a>
              {isLogin? (
                <button onClick={handleLogout}>Log Out</button>
              ) : null}
            </li>
           </ul>
        </nav>
    )
};