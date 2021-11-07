import axios from 'axios';
import queryString from 'querystring';
import LocalStorageService from 'utils/LocalStorageService';

const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

AxiosClient.interceptors.request.use((config: any) => {
  const token = LocalStorageService.getDecodeString('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

AxiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  window.location.href = "/login"
});

export default AxiosClient;