import { Link, Outlet, redirect } from "react-router-dom";
import { useState } from 'react';
import Searchbar from "../components/searchbar";

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('user')))

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

    window.location.replace('/')
  }

  return (
    <div className="home-container">
      <div className="navbar">
        <div className='logo-searchbar-box'>
          <Link to="/">
            <img src="http://localhost:3000/jasmine.png" alt="home" className="logo"></img>
          </Link>
          <Searchbar />
        </div>
        <div className="login-signup-box">
        { loggedIn
        ? <div className="logout-button" onClick={handleLogout}>Logout</div>
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
        <Outlet context={[loggedIn, setLoggedIn]} />
      </div>
    </div>
  );
};

export default Root;
