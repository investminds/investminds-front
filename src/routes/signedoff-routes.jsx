import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignedInLayout from "../layouts/signedin-layout";
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";

const signedOffRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignedInLayout />,
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
        path: "/forgot-password",
        element: <PasswordRecovery />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

export default signedOffRouter;
