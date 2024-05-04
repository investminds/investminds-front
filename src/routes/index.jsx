import { RouterProvider } from "react-router-dom";
import signedInRouter from "./signedin-routes";

export const SignedInRoutes = () => {
  return <RouterProvider router={signedInRouter} />;
};
