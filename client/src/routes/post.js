import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Post = () => {
    const [post, setPost] = useState([])

    async function getPost() {
        await fetch('http://127.0.0.1:3001' + window.location.pathname)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error('Error: ', err))
    }

    useEffect(() => {
        getPost()
    }, [])
    

    return (
        <>
            <div className="container" key={post._id}>
                <div className="feed-box">
                    <div className="post-profile">
                        <Link to="/profile" className="no-decoration">
                            <img className="post-profile-pic" alt="profile" src={ post.profilepic }></img>
                        </Link>
                        <Link to="/profile" className="no-decoration">
                            <div className="post-profile-name">{ post.user }</div>
                        </Link>
                    </div>
                    <div className="content-box">
                        { post.content }
                    </div>
                </div>
            </div>
        </>
  )
}

export default Post