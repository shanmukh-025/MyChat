import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:3000/api" 
    : `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// Add token to all requests in production
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt-token");
    if (token && import.meta.env.MODE !== "development") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
