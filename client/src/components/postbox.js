import { useOutletContext } from "react-router-dom";
import useAutosizeTextArea from "../modules/useAutosizeTextArea";
import React, { useRef, useState } from "react";

const BASE_API = 'http://127.0.0.1:3001'

const Postbox = () => {
  const [loggedIn, setLoggedIn] = useOutletContext()

  async function makePost() {
    if (!loggedIn) {
      console.log('please log in')
      return
    } if (value !== "") {
        let accessTokenIndex = decodeURIComponent(document.cookie).indexOf('accessToken=')
        let accessTokenSlice = decodeURIComponent(document.cookie).slice(accessTokenIndex)
        let accessToken = accessTokenSlice.split(';')[0].split('=')[1]

        await fetch(BASE_API + '/posts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + accessToken
          },
          body: JSON.stringify({
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
    <div className="container">
      <div className="post-box" ref={postBoxRef}>
        <textarea
          id="postContent"
          className="post-textarea"
          placeholder="How's life?"
          onChange={handleChange}
          ref={textAreaRef}
          rows={1}
          value={value}
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
