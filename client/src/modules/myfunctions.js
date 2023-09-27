function GetUserPosts() {
    fetch(API_BASE + '/user/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(err => console.error('Error: ', err))
  }