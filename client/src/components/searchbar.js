import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const [searchResults, setSearchResults] = useState(false)
  const [popupActive, setPopupActive] = useState(false)
  const [value, setValue] = useState()

  const handlePopup = () => {
    setPopupActive(!popupActive)
  }

  const searchHandler = async (event) => {
    if (event.key == 'Enter') {
      const query = document.getElementById('search').value

      const result = await (await fetch('http://127.0.0.1:3001/search/' + query)).json()

      setSearchResults(result)
      setPopupActive(true)
    } return
  }  

  const clearSearch = () => {
    const query = document.getElementById('search').value

    setValue('')
  }

  const handleChange = (evt) => {
    const val = evt.target.value;

    setValue(val);
  };
  
  return (
      <>
        <div className='searchbar-box'>
          <input className="searchbar" id="search" placeholder="Search..." onKeyUp={(e) => searchHandler(e)} onChange={handleChange} value={value}></input>
          { value ? <img className='search-clear' src='clear.svg' onClick={clearSearch} /> : <div></div> }
          { popupActive ?
            <>
              <div className='search-popup-close' id='search-popup-close' onClick={handlePopup}></div>
              <div className='search-results-box' id='search-results-box'>
              { searchResults
                ?
                  searchResults.map(result => (
                    <Link className='search-results-item' to={`/${result.userId}`} key={result.userId} onClick={handlePopup}>
                      <img className='search-profile-pic' src={result.profilepic} />
                      <div className='search-user'>{result.user}</div>
                    </Link>
              
                ))
                : <div className='search-results-none'>No users found with that name...</div>
              }
              </div>
            </>
          : <div></div>
          }
        </div>
      </>
    );
  };
  
  export default Searchbar;
  