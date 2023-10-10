import { useEffect, useState } from "react";
import Postbox from "../components/postbox.js";
import Profilefeed from "../components/profilefeed.js";

const API_BASE = 'http://localhost:3001'

const Profile = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    GetUser()
  }, [])

  function GetUser() {
    let path = window.location.pathname
    let userId = path.split('/')[1]

    fetch(API_BASE + '/user/' + userId)
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error('Error: ', err))
  }
//   const [user, setUser] = useState('falbokev@gmail.com')
  
//   useEffect(() => {
//     GetFollowing()
//   }, [])

//   function GetFollowing() {
//     fetch(API_BASE + '/user/following')
//     .then(res => res.json())
//     .then(data => setFollowing(data))
//     .catch(err => console.error('Error: ', err))
//   }

//   useEffect(() => {
//     GetFollowers()
//   }, [])

//   function GetFollowers() {
//     fetch(API_BASE + '/user/followers')
//     .then(res => res.json())
//     .then(data => setFollowers(data))
//     .catch(err => console.error('Error: ', err))
//   }

//   function follow() {
//     fetch(API_BASE + '/user/follow', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         user: user
//       })
//   })
// }

  function followingHandler() {
    // Following Popup window
    // get username on page's following document
    // map list of following and their profile pics on popup window
  }

  function followersHandler() {
    // Followers popup window
    // get username on page's followers document
    // map list of followers and their profile pics on popup window
  }

  function followHandler() {
    console.log(user)
    
    // Follow
    // If username is truthy
    // then grab the followed user's email and save it to the following users Following document
    // save the following user's email to the followed user's Followers document
    // change the follow button to say unfollow and change its background color or border
  }

  return (
    <div className="container">
      <div className="profile-page">
        <div className="profile-box">
          <div className="pictures">
            <img src={ user.coverphoto } className="cover-photo"></img>
            <img src={ user.profilepic } className="profile-pic"></img>
          </div>
          <div className="flex-container">
            <div className="profile-name">{ user.user }</div>
            <div className="follow-box">
              <a href="#" className="follow-box-item" onClick={followingHandler}>Following: {user.following}</a>
              <a href="#" className="follow-box-item" onClick={followersHandler}>Followers: {user.followers}</a>
              <button className="follow-box-item button follow-button" onClick={followHandler}>
                Follow
              </button>
            </div>
          </div>
        </div>
        <Postbox />
        <Profilefeed />
      </div>
    </div>
  );
};

export default Profile;
