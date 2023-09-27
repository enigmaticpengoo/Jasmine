import { Link } from "react-router-dom";
import { useState } from "react";

const BASE_API = 'http://127.0.0.1:3001'

const Postbox = () => {
  const [postContent, setPostContent] = useState("");

  async function makePost() {
    if (postContent !== "") {
    const data = await fetch(BASE_API + '/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: postContent
      })
    }).then(res => res.json())
  
    // setPostboxLarge(false)
    setPostContent('')
    } return
  }

  return (
    <div className="container">
      <div className="post-box">
        <div className="post-profile">
          <Link to="/profile" className="no-decoration">
            <img className="post-profile-pic" src="profilepic.png"></img>
          </Link>
          <Link to="/profile" className="no-decoration">
            <div className="post-profile-name">Andrew Falbo</div>
          </Link>
        </div>
        <textarea
          id="postContent"
          className="post-textarea"
          placeholder="How's life?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <div className="post-button-position">
          <button
            id="postButton"
            className="button post-button"
            onClick={makePost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Postbox;
