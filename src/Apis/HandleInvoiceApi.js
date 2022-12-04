import axios from 'axios';
import axiosInstance from './axiosInstance';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhhZjRlNzRiODlkYjI3ODYxOWIzNWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzAwODU1OTAsImV4cCI6MTY3MjY3NzU5MH0.Oyug93O_4rxxQGNAy-Y6hnLAFotHupPfNDhTryY4BlA';
const apiURL = 'https://showroomcar104.onrender.com/';
const authAxiosInstance = axios.create({
    baseURL: apiURL,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})
authAxiosInstance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
console.log(authAxiosInstance)

const getInvoiceByTinhTrang = async (tinhtrang) => {
    return await authAxiosInstance.get(`/hoadons?tinhtrang=${tinhtrang}`)
};

const getInvoiceByPageIndex = async (index) => {
    return await authAxiosInstance.get(`/hoadons?pageIndex=${index}`);
};

const xoaDonDatHang = async (id) => {
    return await authAxiosInstance.delete(`/hoadons/${id}`);
};

const createInvoice = async (data) => {
    return await authAxiosInstance.post("/hoadons", data);
}

const capnhatTinhTrang = async (id, tinhtrang) => {
    return await authAxiosInstance.put(`/hoadons/${id}`, tinhtrang)
}

const getCarByMaCar = async (macar) => {
    return await axiosInstance.get(`/cars?macar=${macar}`)
}
export default {
    getInvoiceByTinhTrang,
    getInvoiceByPageIndex,
    xoaDonDatHang,
    createInvoice,
    capnhatTinhTrang,
    getCarByMaCar,
};