import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: `http://localhost:5000/`,
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// axiosInstance.interceptors.request.use(function (config) {
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   });

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
