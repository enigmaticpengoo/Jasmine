import { useEffect, useRef, useState } from "react";
import Postbox from "../components/postbox.js";
import Profilefeed from "../components/profilefeed.js";
import { Link, useOutletContext } from "react-router-dom";
import Uploadphoto from "../components/uploadphoto.js";

const API_BASE = 'http://localhost:3001'

const Profile = () => {
  const [[loggedIn, setLoggedIn], [loginPopup, setLoginPopup]] = useOutletContext()
  
  const [user, setUser] = useState([])
  const [follow, setFollow] = useState([])
  const [popup, setPopup] = useState(false)
  const [imageType, setImageType] = useState(false)

  const profilepicRef = useRef(null)
  const coverphotoRef = useRef(null)

  useEffect(() => {
    let userPopup = document.getElementById('uploadphoto-popup-box')
    let popupCloser = document.getElementById('uploadphoto-popup-outer')
    let visibility
    popup ? visibility = 'visible' : visibility = 'hidden'

    if (userPopup) {
      userPopup.style.visibility = visibility
      popupCloser.style.visibility = visibility
    }
    
  }, [popup])

  const handlePopup = () => {
    setPopup(!popup)
  }

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

  const uploadPhoto = (type) => {
    setImageType(type)
    setPopup(!popup)
  }

  return (
    <div className="container">
      { popup && 
        <div className="uploadphoto-popup-container">
          <div className="uploadphoto-popup-outer" id='uploadphoto-popup-outer' onClick={handlePopup}></div>
          <div className="uploadphoto-popup-box" id='uploadphoto-popup-box'>
            <Uploadphoto imageType={imageType} userId={loggedIn.userId} />
          </div>
        </div>
      }
      <div className="profile-page">
        <div className="profile-box">
          <div className="pictures">
            { loggedIn && loggedIn.userId === window.location.pathname.split('/')[1]
            ?
            <div className="coverphoto-box" onClick={() => uploadPhoto('coverphoto')}>
              <img className="coverphoto" src={ user.coverphoto } />
              <img className='coverphoto-camera' src='camera.png' />
            </div>
            :
            <div className="coverphoto-box-nohover">
              <img className="coverphoto" src={ user.coverphoto } />
            </div>}
            { loggedIn && loggedIn.userId === window.location.pathname.split('/')[1]
            ?
            <div className="profilepic-box" onClick={() => uploadPhoto('profilepic')}>
              <img className="profilepic" src={ user.profilepic } />
              <img className='profilepic-camera' src='camera.png' />
            </div>
            :
            <div className="profilepic-box-nohover">
              <img className="profilepic" src={ user.profilepic } />
            </div>}
          </div>
          <div className="flex-container">
            <div className="profile-name">{ user.user }</div>
            <div className="follow-box">
              <div className="follow-box-item" onClick={followingHandler}>Following: {user.following}</div>
              <div className="follow-box-item" onClick={followersHandler}>Followers: {user.followers}</div>
              { loggedIn && follow
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
        { loggedIn && loggedIn.userId === window.location.pathname.split('/')[1] && <Postbox />}
        <Profilefeed />
      </div>
    </div>
  );
};

export default Profile;
