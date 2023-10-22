import { useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";

const BASE_API = 'http://127.0.0.1:3001' 

const Signup = () => {
  const data = useActionData()
  const [hidePassword, setHidePassword] = useState(true)
  const [hideRetypePassword, setHideRetypePassword] = useState(true)

  const hideHandler = (id) => {
    let inputField = document.getElementById(id)

    if (id === 'password') {
      const value = hidePassword
      setHidePassword(!value)
    } else {
      const value = hideRetypePassword
      setHideRetypePassword(!value)
    }

    if (inputField.type === "password") {
      inputField.type = "text";
    } else {
      inputField.type = "password";
    }
  }

  return (
    <div className="form-box container">
      <Form method='post' action='/signup'>
        {data && data.error && <p className="error">{data.error}</p>}
        <div className="form-item">
        <div>First Name</div>
          <input className="form-input input-border" name="firstName"></input>
        </div>
        <div className="form-item">
        <div>Last Name</div>
          <input className="form-input input-border" name="lastName"></input>
        </div>
        <div className="form-item">
          <div>Email</div>
          <input className="form-input input-border" name="email"></input>
        </div>
        <div className="form-item">
          <div>Password</div>
          <div className='relative input-border'>
            <input className="form-input-password" type='password' name="password" id='password'></input>
            {(hidePassword
            ? <img className='show-icon' src='show.png' onClick={() => hideHandler('password')}/>
            : <img className='show-icon' src='hide.png' onClick={() => hideHandler('password')}/>)}
          </div>
        </div>
        <div className="form-item">
          <div>Retype Password</div>
          <div className="relative input-border">
            <input className="form-input-password" type='password' name="retypePassword" id='retypePassword'></input>
            {(hideRetypePassword
              ? <img className='show-icon' src='show.png' onClick={() => hideHandler('retypePassword')}/>
              : <img className='show-icon' src='hide.png' onClick={() => hideHandler('retypePassword')}/>)}
          </div>
        </div>
        <button className="button form-button" type='submit'>Create</button>
      </Form>
    </div>
  );
};

export default Signup;

export const signupAction = async ({ request }) => {
  const data = await request.formData()

  const submission = {
    user: data.get('firstName') + ' ' + data.get('lastName'),
    email: data.get('email'),
    password: data.get('password')
  }

  async function addUser(data) {
    await fetch(BASE_API + '/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  if (submission.email.includes('@') && submission.email.includes('.')) {
    return {error: '*please use a valid email*'}
  } if (data.get('password') !== data.get('retypePassword')) {
      return {error: '*passwords do not match*'}
  } else {
      addUser(submission)

      return redirect('/login');
    } 
}
