import { Form, Link, redirect } from "react-router-dom";

const Login = () => {  
  return (
    <div className="container form-box ">
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
    console.log('Got access token: ' + res.accessToken)
    document.cookie = 'accessToken=' + res.accessToken
  }

   checkUser(submission)

  return redirect('/');
}