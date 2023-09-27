import { Form, Link, redirect } from "react-router-dom";

const Login = () => {
//   async function checkCredentials() {
//     const credentials = await fetch('http://127.0.0.1:3001/api/auth/login')
//     console.log('got credentials')
    
//     const password = document.getElementById('password').value

//     if (credentials.password === password) {
//       console.log('You have been logged in!')
//     } else {
//       console.log('Invalid credentials.')
//     }
//   }
  
  return (
    <div className="container form-box ">
      <Form method='post' action='/login'>
        <div className="form-item">
          <div>Username</div>
          <input
            className="form-input input-border"
            placeholder="Username"
            name='username'
          ></input>
        </div>
        <div className="form-item">
          <div>Password</div>
          <input
            className="form-input input-border"
            placeholder="Password"
            name='password'
          ></input>
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
    username: data.get('username'),
    password: data.get('password')
  }

  async function checkUser(data) {
    await fetch('http://127.0.0.1:3001/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  checkUser(submission)

  return redirect('/');
}