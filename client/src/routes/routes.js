import { createBrowserRouter } from "react-router-dom";
import Home from "./home.js";
import Profile from "./profile.js";
import Root from "./root.js";
import Login, { loginAction } from "./login.js";
import Signup, { signupAction } from "./signup.js";
import Post from "./post.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      { 
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/post/:id",
        element: <Post />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction
  },
  {
    path: "/signup",
    element: <Signup />,
    action: signupAction
  }
]);

export default router;
