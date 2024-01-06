import { useOutletContext } from "react-router-dom";
import useAutosizeTextArea from "../modules/useAutosizeTextArea";
import React, { useRef, useState } from "react";

const BASE_API = 'http://127.0.0.1:3001'

const Commentbox = ({ postId }) => {
  const [[loggedIn, setLoggedIn], [loginPopup, setLoginPopup]] = useOutletContext()

  async function makePost() {
    if (!loggedIn) {
      setLoginPopup(true)
      return
    } if (value !== "") {
        let accessTokenIndex = decodeURIComponent(document.cookie).indexOf('accessToken=')
        let accessTokenSlice = decodeURIComponent(document.cookie).slice(accessTokenIndex)
        let accessToken = accessTokenSlice.split(';')[0].split('=')[1]

        await fetch(BASE_API + '/comment', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + accessToken
          },
          body: JSON.stringify({
            postId: postId,
            content: value,
            userId: loggedIn.userId
          })
        })
        .then(res => res.json())
        .then(data => {if (data.accessToken) {
          document.cookie = 'accessToken=' + data.accessToken
        }})

        setValue('')
        } return
      }

  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);
  const postBoxRef = useRef(null)

  useAutosizeTextArea(textAreaRef.current, value, postBoxRef.current);

  const handleChange = (evt) => {
    const val = evt.target.value;

    setValue(val);
  };

  return (
    <div className="container" style={{ marginTop: -15 }}>
      <div className="comment-box" ref={postBoxRef}>
        <textarea
          id="postContent"
          className="comment-textarea"
          placeholder="Care to comment?"
          onChange={handleChange}
          ref={textAreaRef}
          rows={1}
          value={value}
        ></textarea>
        <div className="comment-button-position">
          <button
            id="postButton"
            className="button comment-button"
            onClick={makePost}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Commentbox;
