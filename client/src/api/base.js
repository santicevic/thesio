import axios from 'axios';

const requestConfig = {
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.response.use(response => response.data);

export default axiosInstance;
