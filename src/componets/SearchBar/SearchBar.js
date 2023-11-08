import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import styles from './SearchBar.module.css';
import Spotify from '../../Spotify/Spotify';
import { convertToMinSec } from '../TrackList/TrackList';

export default function SearchBar({ getSearchResults }) {
  
  const [selectedOption, setSelectedOption] = useState([]);
  const [defineSearch, setDefineSearch] = useState('track')

 // Debounce the API call to reduce unnecessary requests
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId); 
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
//The format of how to display the options in the dropdown list
  const loadOptions = (inputValue, callback) => {
    const debouncedSearch = debounce(async (value) => {
      if (value) {
        const searchResults = await Spotify.search1(value);
        const options = searchResults.map((option) => ({
          value: option.id,
          label: (
            <div key={option.id} className={styles.customOption}>
                <img src={option.image} alt={option.id} className={styles.searchImage} />
                <span className={styles.searchTxt}>{option.name},</span>
                <span className={styles.searchTxt}>{option.artist}</span>
            </div>
          ),
          uri: option.uri,
          duration: convertToMinSec(option.duration),
          album:option.album
        }));
        getSearchResults(searchResults)
        callback(options);
      }
    }, 500); 
  
    debouncedSearch(inputValue);
  };


  
  const handleSelectionChange = (selectedValues) => {
    setSelectedOption(selectedValues);
  };

  // Trigger the search when the Enter key is pressed
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

//Sending only the selected opions to the display in the track list
  const handleSearch = () => {
    const searchToTrack = selectedOption.map((option) => ({
      uri: option.uri,
      duration: option.duration,
      image: option.label.props.children[0].props.src,
      name: option.label.props.children[1].props.children[0],
      artist: option.label.props.children[2].props.children,
      album: option.album,
      id: option.label.key
    }))
    getSearchResults(searchToTrack)
    setSelectedOption([])
  };



// Search bar styles.
      const customAsyncStyles = { 
        option: (defaultStyles, state) => ({
          ...defaultStyles,
          color: state.isSelected ? "#212529" : "#fff",
          backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        }),
    
        control: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: "#212529",
          padding: "3px",
          border: "none",
          boxShadow: "none",
          borderRadius: "15px",
        }),

        input: (provided) => ({
          ...provided,
          color: "#fff",
        }),

        multiValue: (provided) => ({
          ...provided,
          backgroundColor: "#fff",
          borderRadius: '15px'
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "#212529",
        }),
      }; 


      return (
        <div className={styles.searchForm}>
          <div className={styles.container}>
            <div className={styles.row_searchBar}>
            <AsyncSelect
              loadOptions={loadOptions}
              cacheOptions
              defaultOptions
              placeholder="Singer name"
              isMulti
              value={selectedOption}
              onChange={handleSelectionChange}
              onKeyDown={handleEnterKeyPress}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              styles={customAsyncStyles}
            />
            </div>
{/*        <div>
             <button type='button' className={styles.submitBtn} onClick={handleSearch}>
                {defineSearch === 'album' ? 'Search' : 'Add'}
              </button>
            </div>*/}
          </div>
          
          <div className={styles.btn_container}>
          <button
             type='button'
             className= {styles.btn_searchDef}
             onClick={() => {
               setDefineSearch('all');
               console.log(defineSearch)
             }}>
             All
          </button>

          <button
             type='button'
             className={styles.btn_searchDef}
             onClick={() => {
               setDefineSearch('artist');
               console.log(defineSearch)
             }}>
             Artist
            </button>

            <button
             type='button'
             className={styles.btn_searchDef}
             onClick={() => {
               setDefineSearch('album');
               console.log(defineSearch)
             }}>
             Albums
            </button>

            <button
             type='button'
             className={styles.btn_searchDef}
             onClick={() => {
             setDefineSearch('track');
             console.log(defineSearch)
             }}>
             Songs
            </button>
          </div>
        </div>
      );
      
  }
