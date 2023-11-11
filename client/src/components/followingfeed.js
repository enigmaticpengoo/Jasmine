import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const API_BASE = 'http://127.0.0.1:3001'

const Followingfeed = () => {
    const [loggedIn, setLoggedIn] = useOutletContext()
    const [posts, setPosts] = useState([])

  useEffect(() => {
    if (loggedIn) {
      GetPosts()
    }
  }, [])

  function GetPosts() {
    fetch(API_BASE + '/posts/follow/' + loggedIn.userId)
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(err => console.error('Error: ', err))
  }

  return (
    <div className="feed">
      {!loggedIn
      ? <div className="container m-t-10">To use this feature login&nbsp;<Link to='login'>here</Link>.</div>
      : posts.map(post => (
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Followingfeed;