import { useEffect } from "react";
import { LoginButton, useFacebook, useLoginStatus, useProfile } from 'react-facebook';

const APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

const Facebook = () => {
  console.log(APP_ID);

  async function handleSuccess(response) {
    try {
      console.log(`response`, response);
      const { authResponse } = response;
      const { userID } = authResponse;
      console.log(authResponse);
      FB.api(
        `/${userID}/accounts`,
        function (response) {
          if (response && !response.error) {
            console.log('pages', response);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleError(error) {
    console.log(error);
  }

  return (
    <section className="hero min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastre sua conta Meta</h2>
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
      </div>
    </section>
  );
};
export default Facebook;
