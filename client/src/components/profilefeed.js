import { Link } from "react-router-dom";

const Profilefeed = () => {
  return (
    <div className="container">
      <div className="feed-box">
        <div className="post-profile">
          <Link to="/profile" className="no-decoration">
            <img className="post-profile-pic" src="profilepic.png"></img>
          </Link>
          <Link to="/profile" className="no-decoration">
            <div className="post-profile-name">Andrew Falbo</div>
          </Link>
        </div>
        <div className="content-box">
          Here is my first post! Not really, but we can pretend.
        </div>
      </div>
    </div>
  );
};

export default Profilefeed;
