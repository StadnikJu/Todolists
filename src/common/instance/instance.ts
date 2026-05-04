import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "API-KEY": apiKey,
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
