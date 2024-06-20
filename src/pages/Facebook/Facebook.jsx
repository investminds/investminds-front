import authService from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setUser } from "../../store/reducers/user";
import { Avatar, Button } from "antd";
import { LoginButton } from "react-facebook";

const Facebook = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);

  async function handleCompleteLogin(response) {
    try {
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
      const { token, user: userRes } = res.data;
      dispatch(setUser({ user: { ...userRes, jwt: token } }));
    } catch (error) {
      console.log(error);
    }
  }

  function handleError(error) {
    console.log(error);
  }

  async function handleSuccess(response) {
    try {
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
      console.log(error);
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen hero">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Cadastre sua conta Meta
        </h2>
        <div className="flex justify-center">
          <LoginButton
            scope="public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts"
            onError={handleError}
            onSuccess={handleSuccess}
            className="bg-[#FF4773] text-white font-semibold py-2 px-4 rounded shadow hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login via Facebook
          </LoginButton>
        </div>
        {loggedUser.jwt && (
          <>
            <div className="flex items-center w-full h-10 my-2 ">
              <Avatar
                shape="square"
                className="w-auto h-full"
                src={loggedUser.picture}
              />
              <span>Logado como: {loggedUser.name}.</span>
            </div>
            <Button
              onClick={() => {
                dispatch(resetState());
              }}
              danger
              className="flex items-center justify-center w-full px-4 py-2 mt-4 font-bold text-white rounded"
            >
              Sair
            </Button>
          </>
        )}
      </div>
    </section>
  );
};
export default Facebook;
