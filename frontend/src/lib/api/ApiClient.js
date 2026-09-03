import axios from "axios";
import useAuthStore from "../stores/authStore";

const api_url = "https://mentroapi.onrender.com/api";

const Api = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default Api;