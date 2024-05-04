import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignedInLayout from "../layouts/signedin-layout";

const signedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignedInLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

export default signedInRouter;
