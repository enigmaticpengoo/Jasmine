import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const API_BASE = 'http://127.0.0.1:3001'

const Feed = () => {
  const [[ loggedIn, setLoggedIn ] , [ loginPopup, setLoginPopup ]] = useOutletContext()
  
  const [ posts, setPosts ] = useState([])
  const [ liked, setLiked ] = useState(new Map())

  useEffect(() => {
    const res = GetPosts().then(res => {
      setPosts(res)

      const likedPosts = new Map(res.map(post => [ post._id, post.liked ]))

      setLiked(likedPosts)
    })
  }, [])

  async function GetPosts() {
    return await fetch(API_BASE + '/posts/feed/' + (loggedIn ? loggedIn.userId : null))
    .then(res => res.json())
    .catch(err => console.error('Error: ', err))
  }

  async function deletePost(id) {
    await fetch(API_BASE + '/post/' + id, {
      method: 'DELETE'
    }).then(res => res.json())

    //Trigger refresh
  }

  const likedHandler = (postId) => {
    // Go to api and set liked on liked doc
    if (!loggedIn) {
      setLoginPopup(true)
      return
    }
      console.log('pre fetch')
    
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
      }
    
    setLiked(new Map(liked.set( postId, !liked.get(postId) )))

    console.log(liked.get(postId))
  }

  return (
    <div className="feed">
      {posts.map(post => (
        <div className="feed-container" key={post._id}>
          <div className="feed-box">
            <div className="post-profile">
              <Link to={'/' + post.userId} className="no-decoration">
                <img className="post-profile-pic" alt="profile" src={ post.profilepic }></img>
              </Link>
              <Link to={"/" + post.userId} className="no-decoration">
                <div className="post-profile-name">{ post.user }</div>
              </Link>
            </div>
            <Link to={'/post/' + post._id} className="no-decoration">
              <div className="content-box">
                { post.content }
              </div>
            </Link>
            <div className="post-util-bar">
                { liked.get(post._id)
                ?
                <img className='post-util-item' src='/heart-fill.svg' onClick={() => likedHandler(post._id)} />
                :
                <img className='post-util-item' src='/heart.svg' onClick={() => likedHandler(post._id)} /> }
                <img className='post-util-item' src='/comment.svg' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
