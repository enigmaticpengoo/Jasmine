import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Comment from "./comment";

const API_BASE = 'http://127.0.0.1:3001'

const Feed = ({ feedType }) => {
  const [[ loggedIn, setLoggedIn ] , [ loginPopup, setLoginPopup ]] = useOutletContext()
  
  const [ posts, setPosts ] = useState([])
  const [ liked, setLiked ] = useState(new Map())

  useEffect(() => {
    GetPosts().then(res => {
      setPosts(res)
      
      const likedPosts = new Map(res.map(post => [ post._id, post.liked ]))

      setLiked(likedPosts)
    })
  }, [])

  async function GetPosts() {
    if (feedType === 'regular') {
      return await fetch(API_BASE + '/posts/feed/' + (loggedIn ? loggedIn.userId : null))
      .then(res => res.json())
      .catch(err => console.error('Error: ', err))

    } else if (feedType === 'profile') {

      const userProfile = window.location.pathname.split('/')[1]
      
      return await fetch(API_BASE + '/posts/' + userProfile)
      .then(res => res.json())
      .catch(err => console.error('Error: ', err))

    } else if (feedType === 'following') {

      return await fetch(API_BASE + '/posts/follow/' + (loggedIn ? loggedIn.userId : null))
      .then(res => res.json())
      .catch(err => console.error('Error: ', err))

    } else {
      console.log('Error: Invalid Feed Type')
      return
    }
  }

  async function deletePost(id) {
    let accessTokenIndex = decodeURIComponent(document.cookie).indexOf('accessToken=')
    let accessTokenSlice = decodeURIComponent(document.cookie).slice(accessTokenIndex)
    let accessToken = accessTokenSlice.split(';')[0].split('=')[1]
    
    await fetch(API_BASE + '/post/' + id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        userId: loggedIn.userId
      })
    }).then(res => res.json())
      .catch(err => console.log(err))

    window.location.reload()
  }

  const likedHandler = (postId) => {
    if (!loggedIn) {
      setLoginPopup(true)
      return
    }
      let accessTokenIndex = decodeURIComponent(document.cookie).indexOf('accessToken=')
      let accessTokenSlice = decodeURIComponent(document.cookie).slice(accessTokenIndex)
      let accessToken = accessTokenSlice.split(';')[0].split('=')[1]
  
      if (!liked.get(postId)) {
        fetch(API_BASE + '/like', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + accessToken
          },
          body: JSON.stringify({
            postId: postId,
            userId: loggedIn.userId
          })
        })

        const likeUpdateIndex = posts.findIndex(post => post._id === postId)
        const likeUpdate = posts[likeUpdateIndex].likes++

        setPosts([...posts], likeUpdate)
      } else {
        fetch(API_BASE + '/like', {
          method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + accessToken
              },
              body: JSON.stringify({
                postId: postId,
                userId: loggedIn.userId
              })
        })

        const likeUpdateIndex = posts.findIndex(post => post._id === postId)
        const likeUpdate = posts[likeUpdateIndex].likes--

        setPosts([...posts], likeUpdate)
      }
    
    setLiked(new Map(liked.set( postId, !liked.get(postId) )))
  }

  const getTime = (postedTime) => {
    const timeElapsed = (Date.now() - postedTime) / 1000
    
    const time = [
      { name: 'years', number: 365*24*60*60 },
      { name: 'months', number: 30*24*60*60 },
      { name: 'weeks', number: 7*24*60*60 },
      { name: 'days', number: 24*60*60 },
      { name: 'hours', number: 60*60 },
      { name: 'minutes', number: 60 },
      { name: 'seconds', number: 1 }
    ]

    for (let t of time) {
      if (timeElapsed >= t.number) {
        const convertedTime = Math.floor(timeElapsed / t.number)
        if (convertedTime > 1) {
          return convertedTime + ' ' + t.name + ' ago'
        } else {
          return convertedTime + ' ' + t.name.slice(0, -1) + ' ago'
        }
      }
    }
  }

  const postPopupHandler = (postId) => {
    if(document.getElementById(postId + '-popup')) {
      const popup = document.getElementById(postId + '-popup')
      if (popup.style.visibility === 'hidden') {
      popup.style.visibility = 'visible'
      } else {
        popup.style.visibility = 'hidden'
      }
    }
  }

  return (
    <div className="feed">
      {posts.map(post => (
        <div className="feed-comment-container" key={post._id}>
          <div className="feed-container">
            <div className="feed-box">
              <div className="post-top-container">
                <div className="post-profile">
                  <Link to={'/' + post.userId} className="no-decoration">
                    <img className="post-profile-pic" alt="profile" src={ post.profilepic }></img>
                  </Link>
                  <Link to={"/" + post.userId} className="no-decoration">
                    <div className="post-profile-name">{ post.user }</div>
                  </Link>
                </div>
                <div className="dot-menu-container">
                  <img className='post-dot-menu' src='vertical-dot-menu.svg' onClick={() => postPopupHandler(post._id)} />
                  { loggedIn && loggedIn.userId === post.userId &&
                  <div className="post-popup-container" id={post._id + '-popup'}>
                    <div className="post-popup-close" onClick={() => postPopupHandler(post._id)}></div>
                    <div className="post-popup-box">
                      <div className="post-popup-item" onClick={() => deletePost(post._id)}>Delete</div>
                    </div>
                  </div>}
                </div>
              </div>
              <Link to={'/post/' + post._id} className="no-decoration">
                <div className="content-box">
                  { post.content }
                </div>
              </Link>
              <div className="post-bottom-container">
                <div className="post-util-bar">
                    { post.likes > 0
                    ?
                    <div className="like-counter">{ post.likes }</div>
                    :
                    <div className='like-counter'></div>
                    }
                    { liked.get(post._id)
                    ?
                    <img className='post-util-item' src='/heart-fill.svg' onClick={() => likedHandler(post._id)} />
                    :
                    <img className='post-util-item' src='/heart.svg' onClick={() => likedHandler(post._id)} /> }
                    <img className='post-util-item' src='/comment.svg' />
                </div>
                <div className="posted-time">{ getTime(post.timestamp) }</div>
              </div>
            </div>
          </div>
          <Comment />
        </div>
      ))}
    </div>
  );
};

export default Feed;
