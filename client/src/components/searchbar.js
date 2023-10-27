import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const [searchResults, setSearchResults] = useState(false)
  const [popupActive, setPopupActive] = useState(false)
  
  useEffect(() => {
    searchResults ? setPopupActive(true) : setPopupActive(false)
  }, [searchResults])

  const searchHandler = async (event) => {
    if (event.key == 'Enter') {
      const query = document.getElementById('search').value

      const result = await (await fetch('http://127.0.0.1:3001/search/' + query)).json()

      setSearchResults(result)
    } return
  }  
  
  return (
      <>
        <div className='searchbar-box'>
          <input className="searchbar" id="search" placeholder="Search..." onKeyUp={(e) => searchHandler(e)}></input>
          { popupActive ?
            <div className='search-results-box'>
            { searchResults
              ?
                searchResults.map(result => (
                  <Link className='search-results-item' to={`/${result.userId}`} key={result.userId}>
                    <img className='search-profile-pic' src={result.profilepic} />
                    <div className='search-user'>{result.user}</div>
                  </Link>
                
              ))
              : <div></div>
            }
            </div>
          : <div></div>
          }
        </div>
        
      </>
    );
  };
  
  export default Searchbar;
  