import axiosInstance from "../axiosInstance";
const createCustomer = async (data) => {
    return await axiosInstance.post(`/users/customers`, data);
};

const deleteCustomer = async (id) => {
    return await axiosInstance.delete(`/users/customers/${id}`);
};
const updateCustomer = async (id, data) => {
    return await axiosInstance.put(`/users/customers/${id}`, data);
};
const getAllCustomers = async () => {
    return await axiosInstance.get(`/users/customers`);
};
const getCustomerById = async (id) => {
    return await axiosInstance.get(`/users/customers/${id}`);
};
const getEmployeeByPageIndex = async (index) => {
    return await axiosInstance.get(`/users/customers?pageIndex=${index}`);
};

 //eslint-disable-next-line import/no-anonymous-default-export
export default {
    createCustomer,
    deleteCustomer,
    updateCustomer,
    getAllCustomers,
    getCustomerById,
    getEmployeeByPageIndex
};