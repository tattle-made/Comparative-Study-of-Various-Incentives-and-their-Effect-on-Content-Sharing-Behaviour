import axios from "axios";
// import { getUser } from "./user-authentication";

const API_URL = process.env.API_HOST;

const get = async (endpoint) => {
  return await axios.get(`${API_URL}${endpoint}`, headers());
};

const post = async (endpoint, payload) => {
  return await axios.post(`${API_URL}${endpoint}`, payload);
};

const postWithToken = async (endpoint, payload) => {
  return await axios.post(`${API_URL}${endpoint}`, payload, headers());
};

const patch = async (endpoint, payload) => {
  return await axios.patch(`${API_URL}${endpoint}`, payload, headers());
};

const deleteApi = async (endpoint) => {
  return await axios.delete(`${API_URL}${endpoint}`, headers());
};

const headers = () => {
  // const user = getUser();
  // if (!user) navigate("/app/login");
  // const { accessToken } = user;
  // return {
  //   headers: { Authorization: "Bearer " + accessToken },
  // };
  return {
    headers: { Authorization: "Bearer " + "test_token" },
  };
};

export { get, post, postWithToken, API_URL, deleteApi, patch };
