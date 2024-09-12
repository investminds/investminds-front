import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignedOffLayout from "../layouts/signedoff-layout";
import Facebook from "../pages/Facebook/Facebook"
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const signedOffRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignedOffLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

export default signedOffRouter;
