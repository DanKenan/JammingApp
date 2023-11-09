import artistsNames from '../py/names.json';


const clientId = ''//enter one here
const redirectUri = 'http://localhost:3000/'; 
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  getUser(){
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
   }).then (response => {
    return response.json();
   }).then(jsonResponse => {
      return {
       name: jsonResponse.display_name,
       image: jsonResponse.images
      }
   }) 
  },


    search1(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      console.log(jsonResponse)
      if (!jsonResponse.tracks) {
        return [];
      }

      const filterResult =  jsonResponse.tracks.items.filter(track => artistsNames.names.includes(track.artists[0].name))
      console.log('filter:', filterResult)

      const mappedTracks = filterResult.map(track => ({
        id: track.id,
        image: track.album.images && track.album.images[2] ? track.album.images[2].url : null,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        duration: track.duration_ms
      }));
      console.log('Mapped Tracks:', mappedTracks);

      return mappedTracks;
  });
},


  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  },

  getPlaylists() {
    const accessToken = Spotify.getAccessToken();
  
    
    const artistsNames = require('../py/names.json'); 
  
    return fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => response.json())
      .then((playlistsResponse) => {
        const playlists = playlistsResponse.items;
  
        const playlistPromises = playlists.map((playlist) => {
          const playlistId = playlist.id;
          return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
            .then((response) => response.json())
            .then((tracksResponse) => {
              const tracks = tracksResponse.items;
  
              // Extract relevant playlist information
              const playlistInfo = {
                id: playlist.id,
                name: playlist.name,
                snapshot_id: playlist.snapshot_id,
                image: playlist.images[0].url
              };
  
              // Extract relevant track information and filter based on artist names
              const trackInfo = tracks
                .map((track) => ({
                  id: track.track.id,
                  name: track.track.name,
                  artist: track.track.artists.map((artist) => artist.name).join(', '),
                  album: track.track.album.name,
                  image: track.track.album.images[0].url, 
                  duration: track.track.duration_ms,
                  uri: track.track.uri
                }))
                .filter((track) => artistsNames.names.includes(track.artist));
  
              return {
                playlist: playlistInfo,
                tracks: trackInfo
              };
            });
        });
  
        return Promise.all(playlistPromises);
      });
  }
  

};

export default Spotify;
