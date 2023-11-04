import { useEffect, useState } from "react";
import Postbox from "../components/postbox.js";
import Profilefeed from "../components/profilefeed.js";
import { useOutletContext } from "react-router-dom";

const API_BASE = 'http://localhost:3001'

const Profile = () => {
  const [loggedIn, setLoggedIn] = useOutletContext()
  
  const [user, setUser] = useState([])
  const [follow, setFollow] = useState([])

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

  async function followingHandler() {
    const following = window.location.pathname
    
    const res = await fetch(`http://localhost:3001/user/following${following}`)
  }

  async function followersHandler() {
    const follower = loggedIn.userId
    
    const res = await fetch(`http://localhost:3001/user/follower/${follower}`)
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

  const uploadPhoto = (photoType) => {
    const photo = photoType

    
  }

  return (
    <div className="container">
      <div className="profile-page">
        <div className="profile-box">
          <div className="pictures">
            <div className="coverphoto-box" onClick={() => uploadPhoto('coverphoto')}>
              <img className="coverphoto" src={ user.coverphoto } />
              <img className='coverphoto-camera' src='camera.png' />
            </div>
            <div className="profilepic-box" onClick={() => uploadPhoto('profilepic')}>
              <img className="profilepic" src={ user.profilepic } />
              <img className='profilepic-camera' src='camera.png' />
            </div>
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
