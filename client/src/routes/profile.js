import Postbox from "../components/postbox.js";
import Profilefeed from "../components/profilefeed.js";

const Profile = () => {
  return (
    <div className="container">
      <div className="profile-page">
        <div className="profile-box">
          <div className="pictures">
            <img src="coverphoto.jpg" className="cover-photo"></img>
            <img src="profilepic.png" className="profile-pic"></img>
          </div>
          <div className="profile-name">Andrew Falbo</div>
          <div className="follow-box">
            <div className="follow-box-item">Following: 0</div>
            <div className="follow-box-item">Follows: 0</div>
            <button className="follow-box-item button follow-button">
              Follow
            </button>
          </div>
        </div>
        <Postbox />
        <Profilefeed />
      </div>
    </div>
  );
};

export default Profile;
