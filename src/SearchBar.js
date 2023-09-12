import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import './CSS/NavBar.css';


/*still need: 
1)when click change color.
2)multiple choice option. 
3)create a playlist viewer
4)when submit to show it in the playlist viewer.

 style:
1) make search bar less wide. 
2} move evrything to the middle of the page.
*/

export default function SearchBar(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const songOptions = Object.keys(props.songs).map((songKey) => {
    const { artist, song, img } = props.songs[songKey];
  return {
    value: `${artist} - ${song}`,
    label: `${artist} - ${song}`,
    image: img,
  };
})
;

      const customOption = ({ innerProps, label, data, isSelected }) => (
        <div {...innerProps} className={`custom-option ${isSelected ? 'selected' : ''}`}>
          <img src={data.image} alt="Singer Picture" className="navImage" />
          <span className='song-label'>{label}</span>
        </div>
      );



      const customStyles = { 
        control: (styles) => ({ ...styles, 
          backgroundColor: "pink", 
          color: "black",
          width: '100%',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? 'red' : 'white',
          cursor: 'pointer',
        }),
        multiValue: (provided, state) => ({
          ...provided,
          backgroundColor: "yellow",
          color: "black",
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "red",
        }),
      }; 

      const handleOptionSelect = (selected) => {
        setSelectedOption(selected);
      };
      
      return (
        <div className='search-bar'>
        <form className='navForm'>
          <h3 className='heading'>Jewish Music</h3>
          <div className='Image'></div>
          <label htmlFor="songName" className='formText'>Start your search</label>
          <Select
            options={songOptions}
            placeholder="Song name"
            components={{ Option: customOption }}
            styles={customStyles}
            isMulti
            value={selectedOption}
            onChange={handleOptionSelect}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
          />
          <input type='submit' value='Submit'/>
        </form>
        </div>
      );
      
  }

