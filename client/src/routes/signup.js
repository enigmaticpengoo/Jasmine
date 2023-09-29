import { Form, redirect, useActionData } from "react-router-dom";

const BASE_API = 'http://127.0.0.1:3001' 

const Signup = () => {
  const data = useActionData()

  return (
    <div className="form-box container">
      <Form method='post' action='/signup'>
        {data && data.error && <p>{data.error}</p>}
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
          <input className="form-input input-border" name="password"></input>
        </div>
        <div className="form-item">
          <div>Retype Password</div>
          <input className="form-input input-border" name="retypePassword"></input>
        </div>
        <button className="button form-button" type='submit'>Create</button>
      </Form>
    </div>
  );
};

export default Signup;

// COPY
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

  if (data.get('password') === data.get('retypePassword')) {
    console.log(submission)

    addUser(submission)

    return redirect('/login');
  } return {error: '*passwords do not match*'}
}
