import axios from "axios";

const SOFTWARE_CATALOG_URL = import.meta.env.VITE_SOFTWARE_CATALOG_URL;
const api = axios.create({
  baseURL: SOFTWARE_CATALOG_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const createSoftware = async (payload) => {
  try {
    const response = await api.post(`/api/software`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getSoftwareById = async (softwareId) => {
  try {
    const response = await api.get(`/api/software/${softwareId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const findByOwner = async (ownerId) => {
  try {
    const response = await api.get(`/api/software/owner/${ownerId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getSoftwaresList = async () => {
  const response = await api.get(`/api/software`);
  return response.data;
};

const addReview = async (payload) => {
  const response = await api.post(`/api/reviews`, payload);
  return response.data;
};

const getReviewsBySoftwareId = async (softwareId) => {
  const response = await api.get(`/api/reviews/software/${softwareId}`);
  return response.data;
};

const archiveSoftware = async (softwareId) => {
  const response = await api.post(`/api/software/archive/${softwareId}`);
  return response.data;
};

const unarchiveSoftware = async (softwareId) => {
  const response = await api.post(`api//software/unarchive/${softwareId}`);
  return response.data;
};

const updateSoftware = async (softwareId, payload) => {
  const response = await api.put(`/api/software/${softwareId}`, payload);
  return response.data;
};

export default {
  createSoftware,
  getSoftwareById,
  findByOwner,
  getSoftwaresList,
  addReview,
  getReviewsBySoftwareId,
  archiveSoftware,
  unarchiveSoftware,
  updateSoftware,
};
