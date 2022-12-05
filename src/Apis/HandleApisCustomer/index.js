import axiosInstance from "../axiosInstance";
const createCustomer = async (data, token) => {
    return await axiosInstance.post("/users/customer", data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const deleteCustomer = async (id, token) => {
    return await axiosInstance.delete(`/users/customers/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
const updateCustomer = async (id, data, token) => {
    return await axiosInstance.put(`/news/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
const getAllCustomers = async (token) => {
    return await axiosInstance.get("/users/customers",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
const getCustomerById = async (id,token) => {
    return await axiosInstance.get(`/users/customers/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
 //eslint-disable-next-line import/no-anonymous-default-export
export default {
    createCustomer,
    deleteCustomer,
    updateCustomer,
    getAllCustomers,
    getCustomerById
};