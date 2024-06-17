import { useEffect } from "react";
import {  LoginButton, Page, useFacebook, useLoginStatus, useProfile } from 'react-facebook';

const APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

const Home = () => {
  console.log(APP_ID);

  async function handleSuccess(response) {
    try {
      console.log(`response`, response)
      const { authResponse } = response
      const { userID} = authResponse
      console.log(authResponse)
      FB.api(
        `/${userID}/accounts`,
        function (response) {
          if (response && !response.error) {
            console.log('pages', response)
          }
        }
    )
    } catch (error) {
      console.log(error);     }
  }

  function handleError(error) {
    console.log(error);
  }
  
  return (
    <>
      <section className="hero">
        <h1>Welcome To Home Page</h1>
        <LoginButton
          scope="public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts"
          onError={handleError}
          onSuccess={handleSuccess}
        >
          Login via Facebook
        </LoginButton>
      </section>
    </>
  );
};
export default Home;
