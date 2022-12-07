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
const getInvoiceByTinhTrang = async (tinhtrang) => {
    return await axiosInstance.get(`/hoadons?tinhtrang=${tinhtrang}`)
};

const getInvoiceByPageIndex = async (index) => {
    return await axiosInstance.get(`/hoadons?pageIndex=${index}`);
};
const getInvoiceByID = async (id) => {
    return await axiosInstance.get(`/hoadons/${id}`);
}

const getInvoiceByMAHD = async (mahd) => {
    return await axiosInstance.get(`/hoadons?mahd=${mahd}`)
}
const xoaDonDatHang = async (id) => {
    return await axiosInstance.delete(`/hoadons/${id}`);
};

const createInvoice = async (data) => {
    return await axiosInstance.post("/hoadons", data);
}

const capnhatTinhTrang = async (id, tinhtrang) => {
    return await axiosInstance.put(`/hoadons/${id}`, tinhtrang)
}

const getCarByMaCar = async (macar) => {
    return await axiosInstance.get(`/cars?macar=${macar}`)
}

const getCustomerByMaUser = async(makh) => {
    return await axiosInstance.get(`/users/customers?mauser=${makh}`)
}

 //eslint-disable-next-line import/no-anonymous-default-export
export default {
    getInvoiceByTinhTrang,
    getInvoiceByPageIndex,
    getInvoiceByID,
    getInvoiceByMAHD,
    xoaDonDatHang,
    createInvoice,
    capnhatTinhTrang,
    getCarByMaCar,
    getCustomerByMaUser,
};