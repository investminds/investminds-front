import axios from "axios";

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_URL;

const api = axios.create({
  baseURL: AUTH_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const facebookLogin = async (userData) => {
  try {
    const res = await api.post(`/api/facebook/login`, userData);
    const { user, token } = res.data;
    localStorage.setItem("access_token", token);
    return { user, token };
  } catch (error) {
    console.log("Facebook login Error: ", error);
    throw new Error(error);
  }
};

const login = async ({ email, password }) => {
  try {
    const res = await api.post(`${AUTH_API_BASE_URL}/api/user/login`, {
      email,
      password,
    });
    const { user } = res.data;
    localStorage.setItem("access_token", user.token);
    return user;
  } catch (error) {
    console.log("Login Error: ", error);
    throw new Error(error);
  }
};

const register = async (userData) => {
  const res = await api.post(
    `${AUTH_API_BASE_URL}/api/user/register`,
    userData
  );
  const { user } = res.data;
  return user;
};

const forgotPassword = async (email) => {
  await api.post(`${AUTH_API_BASE_URL}/api/user/forgot-password`, {
    email,
  });
};

const resetPassword = async (code, email, password) => {
  await api.post(`${AUTH_API_BASE_URL}/api/user/reset-password`, {
    code,
    email,
    password,
  });
};

const linkFacebookAccount = async (userData) => {
  const res = await api.post(
    `${AUTH_API_BASE_URL}/api/facebook/link-account`,
    userData
  );
  const user = res.data;
  return user;
};

const updateUserbByFields = async (userId, fields) => {
  const res = await api.put(
    `${AUTH_API_BASE_URL}/api/profile/update/${userId}`,
    fields
  );
  const user = res.data;
  return user;
};

const updatePassword = async (newPassword) => {
  await api.put(`${AUTH_API_BASE_URL}/api/profile/update-password`, {
    password: newPassword,
  });
};

export default {
  facebookLogin,
  login,
  register,
  forgotPassword,
  resetPassword,
  linkFacebookAccount,
  updateUserbByFields,
  updatePassword,
};
