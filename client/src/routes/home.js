import Postbox from "../components/postbox.js";
import Feed from "../components/feed.js";
import Searchbar from "../components/searchbar.js";

const Home = () => { 
  return (
    <div className="home-box-container">
      <div>
        <Searchbar />
        <Postbox />
        <Feed />
      </div>
    </div>
  );
};

export default Home;