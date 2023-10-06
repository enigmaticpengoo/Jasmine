import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = 'http://127.0.0.1:3001'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    GetPosts()
  }, [])

  function GetPosts() {
    fetch(API_BASE + '/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(err => console.error('Error: ', err))
  }

  async function deletePost(id) {
    await fetch(API_BASE + '/post/' + id, {
      method: 'DELETE'
    }).then(res => res.json())

    //Trigger refresh
  }

  return (
    <div className="feed">
      {posts.map(post => (
        <div className="feed-container" key={post._id}>
            <div className="feed-box">
              <div className="post-profile">
                    <Link to="/profile" className="no-decoration">
                      <img className="post-profile-pic" alt="profile" src={ post.profilepic }></img>
                    </Link>
                    <Link to="/profile" className="no-decoration ">
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

export default Feed;