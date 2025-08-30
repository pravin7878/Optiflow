import { toaster } from '../components/ui/toaster';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== "/signin"
    ) {
      localStorage.removeItem('user');
      window.location.href = '/signin';
      toaster.create({
        description: error.response.message || "Session expired,Please login again.",
        type: "error",
        placement: "top-end",
      });
    }
    return Promise.reject(error);
  }
);

export default api;