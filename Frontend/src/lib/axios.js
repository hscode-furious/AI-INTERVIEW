import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/** Set from Clerk via `ClerkAxiosSetup` so protected routes receive `Authorization: Bearer`. */
let clerkGetToken = null;

export function setClerkGetToken(getter) {
  clerkGetToken = getter;
}

axiosInstance.interceptors.request.use(async (config) => {
  if (typeof clerkGetToken === "function") {
    const token = await clerkGetToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;