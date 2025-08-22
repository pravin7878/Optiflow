import { toaster } from '../components/ui/toaster';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Remove user from localStorage
      localStorage.removeItem('user');
      // Dispatch logout to Redux
    //   store.dispatch(logout());
      // Redirect to login
      window.location.href = '/singin';
      toaster.create({
        description: error.response.message || "Session expired,Please login again.",
        type: "error",
        placement: "top-end",
      })
    }
    return Promise.reject(error);
  }
);

export default api; 