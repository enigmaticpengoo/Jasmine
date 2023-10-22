const Feedselector = ({ setFeed, setFollowing }) => {
    return (
        <div className="feed-selector-box">
            <div className="feed-selector-item" onClick={setFeed}>Feed</div>
            <div className="feed-selector-item" onClick={setFollowing}>Following</div>
        </div>
  )
}

export default Feedselector