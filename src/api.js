import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const setupInterceptors = (showLoader, hideLoader) => {
  API.interceptors.request.use(
    (config) => {
      showLoader();
      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  API.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );
};

export default API;
