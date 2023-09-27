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
    <>
      {posts.map(post => (
        <div className="container" key={post._id}>
            <div className="feed-box">
              <div className="post-profile nested-link-child">
                    <Link to="/profile" className="no-decoration">
                      <img className="post-profile-pic" alt="profile" src={ post.profilepic }></img>
                    </Link>
                    <Link to="/profile" className="no-decoration ">
                      <div className="post-profile-name">{ post.user }</div>
                    </Link>
              </div>
              <Link to={'/post/' + post._id} className="no-decoration nested-link-parent">
                <div className="content-box">
                  { post.content }
                </div>
              </Link>
            </div>
          
        </div>
      ))}
    </>
  );
};

export default Feed;
