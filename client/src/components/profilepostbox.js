const Profilepostbox = () => {
  return (
    <div className="container">
      <div className="profile-post-box">
        <textarea
          className="post-textarea"
          placeholder="How's life?"
        ></textarea>
        <div className="post-button-position">
          <button className="button post-button">Post</button>
        </div>
      </div>
    </div>
  );
};

export default Profilepostbox;
