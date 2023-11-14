import { useState } from "react";
import { Link, redirect, useOutletContext } from "react-router-dom";

const Login = () => {  
  const [loggedIn, setLoggedIn] = useOutletContext()
  const [ error, setError ] = useState()
  
  const login = async () => {
    const submission = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }

    async function checkUser(data) {
      const result = await fetch('http://127.0.0.1:3001/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .catch(err => console.log(err))

      return result
    }
    
    if (submission.email && submission.password) {
      const result = await checkUser(submission)

      if(result && result.error) {
        setError(result.error)
        return
      } else {
      document.cookie = 'accessToken=' + result.accessToken
      const user = { userId: result.user.userId, user: result.user.user, profilepic: result.user.profilepic }
      const localUser = JSON.stringify(user)
      localStorage.setItem('user', localUser)
      }

      window.location.replace('/')
    } return
  }
  
  const [hidePassword, setHidePassword] = useState(true)

  const hideHandler = (id) => {
    const value = hidePassword
    setHidePassword(!value)

    let inputField = document.getElementById(id)

    if (inputField.type === "password") {
      inputField.type = "text";
    } else {
      inputField.type = "password";
    }
  }
  
  return (
    <div className="login-container">
      {error && <div className="error login-error">*{error}*</div>}
    <div className="container form-box">
      
      <div>
        <div className="form-item">
          <div>Email</div>
          <input
            className="form-input input-border"
            placeholder="Email"
            name='email'
            id='email'
          ></input>
        </div>
        <div className="form-item">
          <div>Password</div>
          <div className="relative input-border">
            <input
              className="form-input-password"
              placeholder="Password"
              type="password"
              name='password'
              id='password'
            ></input>
            {(hidePassword
              ? <img className='show-icon' src='show.png' onClick={() => hideHandler('password')}/>
              : <img className='show-icon' src='hide.png' onClick={() => hideHandler('password')}/>)}
          </div>
        </div>
        <button className="button form-button" type='submit' onClick={login}>Login</button>
        <div className="form-item-small">Login Using Google</div>
        <div className="form-item-small">Forgot password? Click here.</div>
        <div className="form-item-small">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;