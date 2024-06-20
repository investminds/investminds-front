import axios from "axios";

const facebookLogin = async (user) => {
  try {
    const res = await axios.post(
      "http://localhost:3030/api/facebook/login",
      user
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default { facebookLogin };
