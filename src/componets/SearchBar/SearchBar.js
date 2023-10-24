import React from 'react';
import Select from 'react-select';
import { useState , useEffect, useCallback } from 'react';
import styles from './SearchBar.module.css';
import artistsNames from '../../py/names.json';


export default function SearchBar({ onSelectedOptions, searchResults }) {
  
  const [selectedOption, setSelectedOption] = useState('');
  const [singersOptions, setSingersOptions] = useState([]);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [defineSearch, setDefineSearch] = useState('track')

  useEffect(() => {
    console.log('Selected option has changed:', selectedOption);
  }, [selectedOption]);

//maping to get all the Jewish Artists to render in artists search bar. 
  useEffect(() => {
    setSingersOptions(
      artistsNames.names.map((artist, index) => ({
        label: artist,
        value: index,
      }))
    );
  }, []);

//custom dropdown for Album/Track seacrh bar.
  const customOption = (option) => (
    <div key={option.id} className={styles.customOption}>
      <div className={styles.songInfo_side}>
        <img src={option.image} alt={option.id} className={styles.searchImage}/>
        <span>{option.name}</span>
      </div>
      <span className={styles.songInfo_center}>{option.artist}</span>
      <div className={styles.songInfo_side}>
        <span>{option.album}</span>
        <button>Add</button>
      </div>
    </div>
  );

// Search bars styles.
      const customStyles = { 
        option: (defaultStyles, state) => ({
          ...defaultStyles,
          color: state.isSelected ? "#212529" : "#fff",
          backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        }),
    
        control: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: "#212529",
          padding: "5px",
          border: "none",
          boxShadow: "none",
        }),

        input: (provided) => ({
          ...provided,
          color: "#fff",
        }),

        multiValue: (provided) => ({
          ...provided,
          backgroundColor: "#fff",
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "#212529",
        }),
      }; 

      //For the artists search bar:
      //Maping over the user artist choice, and send the info to the App component.      
  const handleSearch = useCallback(() => {
    if (selectedOption.length > 0) {
      const selectedLabels = selectedOption.map((option) => option.label);
      onSelectedOptions(selectedLabels);
    }
    // set search complete to false, to prevent a loop of rendering from the API.
    setSearchCompleted(false);
  }, [selectedOption, onSelectedOptions]);
  
  // Listen for changes in selectedOption
  const handleSelectionChange = (selected) => {
    setSelectedOption(selected);
    // Set searchCompleted to true when the user selects an option.
    setSearchCompleted(true);
  };

  useEffect(() => {
    if (searchCompleted && selectedOption.length > 0) {
      // Call the search function when the search is completed
      handleSearch();
    }
  }, [searchCompleted, selectedOption, handleSearch]);


      return (
        <div>
        <form className={styles.searchForm}> 
          <div className={styles.formText}>
            <h3 className={styles.heading}>Discover Your Favorite Artist</h3>
            <label htmlFor= 'searchBar' className={styles.displayText}>Begin Your Search Here</label>
          </div>
          <div className={styles.container}>
            <div className={styles.row_singer}>
          <Select
            options={singersOptions}
            placeholder="Singer name"
            styles={customStyles}
            isMulti
            value={selectedOption}
            onChange={handleSelectionChange}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
          />
            </div>
            <div className={styles.row_TrackAlb}>
              <Select 
                formatOptionLabel={(option) => customOption(option)}
                options={searchResults}
                placeholder={defineSearch === 'album' ? 'Albums' : 'Tracks'}
                styles={customStyles}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
              />
            </div>
            <div>
              <button type='button' className={styles.submitBtn} onClick={handleSearch}>
                {defineSearch === 'album' ? 'Search' : 'Add'}
              </button>
            </div>
          </div>
          
          <div className={styles.btn_container}>
            <button
             type='button'
             className={defineSearch === 'album' ? styles.btn_searchDef_album_active : styles.btn_searchDef_album}
             onClick={() => {
               setDefineSearch('album');
               console.log(defineSearch)
             }}>
             Albums
            </button>

            <button
             type='button'
             className={defineSearch === 'track' ? styles.btn_searchDef_track_active : styles.btn_searchDef_track}
             onClick={() => {
             setDefineSearch('track');
             console.log(defineSearch)
             }}>
             Tracks
            </button>
          </div>

        </form>
        </div>
      );
      
  }

