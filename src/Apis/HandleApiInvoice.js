import axiosInstance from './axiosInstance';

const getInvoiceByTinhTrang = async (tinhtrang, pageIndex) => {
    return await axiosInstance.get(`/hoadons?tinhtrang=${tinhtrang}&pageSize=${10}&pageIndex=${pageIndex}`)
};

const getInvoiceByPageIndex = async (pageIndex) => {
    return await axiosInstance.get(`/hoadons?pageIndex=${pageIndex}&pageSize=${10}`);
}
const getInvoiceByID = async (id) => {
    return await axiosInstance.get(`/hoadons/${id}`);
}

const getInvoiceByMAHD = async (mahd) => {
    return await axiosInstance.get(`/hoadons?mahd=${mahd}&pageSize=${10}`)
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
    getInvoiceByID,
    getInvoiceByMAHD,
    xoaDonDatHang,
    createInvoice,
    capnhatTinhTrang,
    getCarByMaCar,
    getCustomerByMaUser,
    getInvoiceByPageIndex,
};