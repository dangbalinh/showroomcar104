import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://showroomcar104.onrender.com/",
    // baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
