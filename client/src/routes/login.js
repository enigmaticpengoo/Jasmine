import { useState } from "react";
import { Form, Link, redirect } from "react-router-dom";

const Login = () => {  
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
    <div className="container form-box">
      <Form method='post' action='/login'>
        <div className="form-item">
          <div>Email</div>
          <input
            className="form-input input-border"
            placeholder="Email"
            name='email'
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
        <button className="button form-button" type='submit'>Login</button>
        <div className="form-item-small">Login Using Google</div>
        <div className="form-item-small">Forgot password? Click here.</div>
        <div className="form-item-small">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;

export const loginAction = async ({ request }) => {
  const data = await request.formData()

  const submission = {
    email: data.get('email'),
    password: data.get('password')
  }

  async function checkUser(data) {
    const response = await fetch('http://127.0.0.1:3001/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    
    const res = await response.json()

    document.cookie = 'accessToken=' + res.accessToken
    const user = { userId: res.user.userId, user: res.user.user, profilepic: res.user.profilepic }
    const newUser = JSON.stringify(user)
    localStorage.setItem('user', newUser)
  }
  
  checkUser(submission)

  return redirect('/')
}