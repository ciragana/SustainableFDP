import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://sustainablefdpapi-e7ahcqbxh5e6fwgt.canadacentral-01.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to include the token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Bearer followed by a space and the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
