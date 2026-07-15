import axios from 'axios';
import { ENV } from '../config/env';
import { LocalTokenStorage } from '../storage/local-token-storage';

export const axiosClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = LocalTokenStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for handling token refresh
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and request wasn't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('auth/login') || originalRequest.url?.includes('auth/refresh')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = LocalTokenStorage.getRefreshToken();
      if (!refreshToken) {
        isRefreshing = false;
        LocalTokenStorage.clear();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${ENV.API_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        LocalTokenStorage.setAccessToken(newAccessToken);

        if (response.data.refresh) {
          LocalTokenStorage.setRefreshToken(response.data.refresh);
        }

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        LocalTokenStorage.clear();

        window.dispatchEvent(new Event('auth-logout'));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
