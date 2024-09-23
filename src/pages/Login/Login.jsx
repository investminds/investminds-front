import React, { useState, useLayoutEffect } from "react";
import { LoginButton } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/reducers/user";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isloading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    const userInfo = jwtDecode(token);
    dispatch(setUser({ user: { ...userInfo, jwt: token } }));
    navigate("/profile");
  }, []);

  const handleSubmit = async (event) => {
    try {
      setIsLoading(true);
      event.preventDefault();

      const formData = new FormData(event.target);
      const email = formData.get("email");
      const password = formData.get("password");
      const data = await authService.login({ email, password });

      dispatch(setUser({ user: data.user }));
      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      setIsLoading(false);
      toast.error("Credenciais inválidas.");
    }
  };

  async function handleCompleteLogin(response) {
    try {
      setIsLoading(true);
      const { name, email, picture, accounts, accessToken, userID } = response;

      const pages = accounts.data
        ? accounts.data.map((page) => ({
            pageId: page.id,
            pageName: page.name,
            pageToken: page.access_token,
            category: page.category,
          }))
        : [];

      const user = {
        facebookId: userID,
        email,
        name,
        facebookToken: accessToken,
        pages,
        picture: picture.data.url,
      };

      const res = await authService.facebookLogin(user);
      dispatch(setUser({ user: { ...res.user, jwt: res.token } }));
      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      toast.error("Ocorreu um erro ao logar com facebook.");
    }
  }

  async function handleSuccess(response) {
    try {
      setIsLoading(true);
      const { authResponse } = response;
      const { userID, accessToken } = authResponse;

      FB.api(
        "/me",
        { fields: "name,email,picture,accounts" },
        async function (response) {
          await handleCompleteLogin({ ...response, userID, accessToken });
        }
      );
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Ocorreu um erro ao logar com facebook.");
    }
  }

  return (
    <>
      <section className="flex items-center justify-center max-h-screen hero">
        <div className="w-full p-8 bg-white rounded shadow-md sm:w-96">
          <h1 className="mb-4 text-2xl font-bold text-center">
            Realize seu Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
              <div className="my-2">
                <Link to="/forgot-password" className="text-sm text-blue-500 ">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            {isloading ? (
              <div className="flex items-center justify-center w-full">
                {" "}
                <Spin />
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  className="w-full bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Login
                </button>
                <hr className="my-4 " />
                <div className="mt-2">
                  <LoginButton
                    type="button"
                    scope="public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts"
                    onSuccess={handleSuccess}
                    className="bg-[#FF4773] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full"
                  >
                    Login via Facebook
                  </LoginButton>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
