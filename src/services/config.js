import axios from 'axios';

// Get token from localStorage
export const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

// Axios default configuration
export const setupAxios = () => {
  // Default to production API unless explicitly overridden
  const base = process.env.REACT_APP_API_BASE_URL || 'https://api.silksew.com';
  axios.defaults.baseURL = base;
  
  // Add a request interceptor to include auth token
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
