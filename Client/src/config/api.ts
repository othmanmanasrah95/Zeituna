import axios from 'axios';

// Detect if we're running in GitHub Codespaces
const isCodespace = window.location.hostname.includes('githubpreview.dev') || 
                   window.location.hostname.includes('preview.app.github.dev') ||
                   process.env.CODESPACE_NAME;

// Use environment variable for API URL, fallback to localhost for local development
const API_URL = process.env.VITE_API_URL || 
                (isCodespace ? `https://${window.location.hostname.replace('3000', '7000')}/api` : 'http://localhost:7000/api');

// Log the API URL for debugging
console.log('🔗 API URL configured as:', API_URL);
console.log('🌐 Current hostname:', window.location.hostname);
console.log('🔍 Is Codespace detected:', isCodespace);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 
