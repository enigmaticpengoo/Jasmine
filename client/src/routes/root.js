import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';
import Searchbar from "../components/searchbar";

const Root = () => { 
  const initializeLoggedIn = () => {
    let state = JSON.parse(localStorage.getItem('user'))

    return state
  }

  const [loggedIn, setLoggedIn] = useState(initializeLoggedIn)
  const [loginPopup, setLoginPopup] = useState(false)
  const [popup, setPopup] = useState(false)
  

  useEffect(() => {
    let userPopup = document.getElementById('user-popup')
    let popupCloser = document.getElementById('user-popup-close')
    let visibility
    popup ? visibility = 'visible' : visibility = 'hidden'

    if (userPopup) {
      userPopup.style.visibility = visibility
      popupCloser.style.visibility = visibility
    }
    
  }, [popup])

  const handlePopup = () => {
    setPopup(!popup)
  }

  const loginPopupHandler = () => {
    setLoginPopup(false)
  }

  const handleLogout = async () => {
    // make delete request to /logout, send userId with request
    await fetch('http://127.0.0.1:3001/logout', {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(loggedIn)
    })

    // delete access token cookie
    document.cookie = 'accessToken=; path=http://127.0.0.1:3000;'

    // set localstorage to null
    localStorage.setItem('user', null)

    window.location.reload()
  }

  return (
    <div className="home-container">
      <div className="navbar">
        {loginPopup && <div className="login-popup-box">
          <div className="login-popup-text">
            To use this feature <Link className="login-popup-link" to='signup' onClick={loginPopupHandler}>create an account</Link> or <Link className="login-popup-link" to='login' onClick={loginPopupHandler}>login</Link>
          </div>
          <img className="login-popup-clear" src='http://localhost:3000/login-clear.svg' onClick={loginPopupHandler} />
        </div>}
        <div className='logo-searchbar-box'>
          <Link to="/">
            <img src="http://localhost:3001/jasmine.png" alt="home" className="logo"></img>
          </Link>
          <Searchbar />
        </div>
        <div className="login-signup-box">
        { loggedIn
        ? <>
            <div className="user-box" onClick={handlePopup}>
              <img className="post-profile-pic user-box-item" src={loggedIn.profilepic}></img>
              <div className="user-box-item">{loggedIn.user}</div>
              <img className='down-arrow user-box-item' src='http://localhost:3000/drop-down-arrow.png'></img>
            </div>
            <div className="user-popup-close" id='user-popup-close' onClick={handlePopup}></div>
            <div className="user-popup" id="user-popup">
              <div className="user-popup-content">
                <Link to={`/${loggedIn.userId}`} className="profile-button no-decoration" onClick={handlePopup}>Profile</Link>
                <div className="logout-button" onClick={handleLogout}>Logout</div>
              </div>
            </div>
          </>
        : <>
            <div className="login">
              <Link to="/login" className="login-signup-buttons">
                Login
              </Link>
            </div>
            <div className="signup">
              <Link to="/signup" className="login-signup-buttons">
                Signup
              </Link>
            </div>
          </>
        }
        </div>
      </div>
      <div className="main">
        <Outlet context={[[loggedIn, setLoggedIn], [loginPopup, setLoginPopup]]} />
      </div>
    </div>
  );
};

export default Root;
