import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="container">
      <div className="left-aside">
        <Link to="/">
          <img src="http://localhost:3000/twitter.png" alt="home" className="twitter-home"></img>
        </Link>
      </div>
      <div className="main">
        <Outlet />
      </div>
      <div className="right-aside">
        <div style={{ marginTop: "12px" }}>
          <Link to="/login" className="login-signup-buttons">
            Login
          </Link>
        </div>
        <div style={{ marginTop: "12px", marginLeft: "10px" }}>
          <Link to="/signup" className="login-signup-buttons">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Root;
