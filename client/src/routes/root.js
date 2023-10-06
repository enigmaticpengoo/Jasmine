import { Link, Outlet } from "react-router-dom";
import React, { useContext } from 'react';
import Searchbar from "../components/searchbar";

const LoggedInContext = React.createContext()

const Root = () => {
  const loggedIn = useContext(LoggedInContext)

  return (
    <LoggedInContext.Provider value=''>
      <div className="home-container">
        <div className="navbar">
          <div className='logo-searchbar-box'>
            <Link to="/">
              <img src="http://localhost:3000/jasmine.png" alt="home" className="logo"></img>
            </Link>
            <Searchbar />
          </div>
          <div className="login-signup-box">
          { loggedIn === ''
          ? <div>Logout</div>
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
            </> }
          </div>
        </div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </LoggedInContext.Provider>
  );
};

export default Root;
