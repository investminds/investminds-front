import axios from "axios";

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_URL;

const facebookLogin = async (user) => {
  try {
    const res = await axios.post(`${AUTH_API_BASE_URL}/facebook/login`, user);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default { facebookLogin };
