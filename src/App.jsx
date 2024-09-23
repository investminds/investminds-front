// app.jsx
import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./store/reducers/user";
import { jwtDecode } from "jwt-decode";
import { RouterProvider } from "react-router-dom";
import signedOffRouter from "./routes/signedoff-routes";
import signedInRouter from "./routes/signedin-routes";

const RoutesMapper = (role) => {
  switch (role) {
    case "consumer":
      return signedInRouter.consumerRouter;
    case "advertiser":
      return signedInRouter.advertiserRouter;
    default:
      return signedOffRouter;
  }
};

const App = () => {
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const { jwt } = loggedUser;
    const token = localStorage.getItem("access_token");
    if (!token && !jwt) return;
    const userInfo = jwtDecode(token);
    dispatch(setUser({ user: { ...userInfo, jwt: token } }));
  }, []);

  return <RouterProvider router={RoutesMapper(loggedUser.role)} />;
};

export default App;
