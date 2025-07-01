import axios from "axios";

const ApiBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
  withCredentials: true,
});

ApiBackend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer ${token}";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { ApiBackend };
