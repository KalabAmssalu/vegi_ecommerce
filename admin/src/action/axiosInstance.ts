import axios from "axios";
import type { AxiosInstance } from "axios";
import { get_session } from "./auth/action";

axios.defaults.withCredentials = true; // Ensure cookies are included

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Only needed if using cookies alongside JWT
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.withCredentials = true; // Include cookies in requests
    const session = await get_session();
    const sessionId = session?.sessionId;
    console.log("session", session);

    if (sessionId) {
      config.headers.Authorization = `Bearer ${sessionId}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
