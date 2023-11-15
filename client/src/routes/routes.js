import { createBrowserRouter } from "react-router-dom";
import Home from "./home.js";
import Profile from "./profile.js";
import Root from "./root.js";
import Login from "./login.js";
import Signup, { signupAction } from "./signup.js";
import Post from "./post.js";
import Uploadphoto, { uploadPhotoAction } from "./uploadphoto.js";

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
        path: "/:userId",
        element: <Profile />,
      },
      {
        path: "/post/:id",
        element: <Post />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: signupAction,
      },
      {
        path: "/signup/uploadphoto",
        element: <Uploadphoto />,
        action: uploadPhotoAction
      }
    ],
  },
  
]);

export default router;
