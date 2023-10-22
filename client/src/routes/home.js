import Postbox from "../components/postbox.js";
import Feed from "../components/feed.js";
import Feedselector from "../components/feedselector.js"
import { useState } from "react";
import Followingfeed from "../components/followingfeed.js";

const Home = () => { 
  const [regularFeed, setRegularFeed] = useState(true)
  
  return (
    <div className="home-box-container">
        <Postbox />
        <div className="feed-selector-container">
          <Feedselector setFeed={() => setRegularFeed(true)} setFollowing={() => setRegularFeed(false)} />
        </div>
        { regularFeed ? <Feed /> : <Followingfeed /> }
    </div>
  );
};

export default Home;