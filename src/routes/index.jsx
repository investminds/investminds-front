import { RouterProvider } from "react-router-dom";
import signedInRouter from "./signedin-routes";
import signedOffRouter from './signedoff-routes';

export const SignedInRoutes = () => {
  return <RouterProvider router={signedInRouter} />;
};

export const SignedOffRoutes = () => {
  return <RouterProvider router={signedOffRouter} />;
};