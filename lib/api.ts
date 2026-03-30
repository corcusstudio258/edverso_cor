import axios from 'axios';
import { getToken, clearToken, validateToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      if (validateToken(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        clearToken();
        // ❌ don't auto-redirect here
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ❌ don't force redirect on 401 here either
    if (error.response?.status === 401) {
      clearToken();
      // just reject; let the component handle the UX
    }
    return Promise.reject(error);
  }
);
