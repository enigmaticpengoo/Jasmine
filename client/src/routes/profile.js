import { useEffect, useState } from "react";
import Postbox from "../components/postbox.js";
import Profilefeed from "../components/profilefeed.js";
import { useOutletContext } from "react-router-dom";

const API_BASE = 'http://localhost:3001'

const Profile = () => {
  const [loggedIn, setLoggedIn] = useOutletContext()
  
  const [user, setUser] = useState([])
  const [follow, setFollow] = useState([])

  console.log(follow)

  useEffect(() => {
    GetFollow()
  }, [])

  async function GetFollow() {
    if (loggedIn) {
      const follower = loggedIn.userId
      const following = window.location.pathname
      
      const result = await fetch(`http://localhost:3001/user/${follower}${following}`)
      .then(res => res.json())
      .then(data => setFollow(data))
      .catch(err => console.error('Error: ', err))
    }
  }

  useEffect(() => {
    GetUser()
  }, [])

  function GetUser() {
    let userId = window.location.pathname

    fetch(API_BASE + '/user' + userId)
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

  async function followingHandler() {
    const following = window.location.pathname
    
    const res = await fetch(`http://localhost:3001/user/following${following}`)

    console.log(res)
  }

  async function followersHandler() {
    const follower = loggedIn.userId
    
    const res = await fetch(`http://localhost:3001/user/follower/${follower}`)

    console.log(res)
  }

  async function followHandler() {
    if (loggedIn) {
      const follower = loggedIn.userId
      const following = window.location.pathname
      
      await fetch(`http://localhost:3001/user/${follower}${following}`, {
        method: 'POST'
      })

      setFollow(true)
    }
  }

  async function unfollowHandler() {
    if (loggedIn) {
      const follower = loggedIn.userId
      const following = window.location.pathname
      
      await fetch(`http://localhost:3001/user/${follower}${following}`, {
        method: 'DELETE'
      })

      setFollow(false)
    }
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
              { follow
              ?
              <button className="follow-box-item button follow-button" onClick={unfollowHandler}>
                Unfollow
              </button>
              :
              <button className="follow-box-item button follow-button" onClick={followHandler}>
                Follow
              </button>
              }
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
