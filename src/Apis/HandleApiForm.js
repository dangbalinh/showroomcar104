import axiosInstance from "./axiosInstance";

const getAllForm = async () => {
    return await axiosInstance.get("/forms");
};

const getFormByPageIndex = async (index) => {
    return await axiosInstance.get(`/forms?pageIndex=${index}`);
};

const getFormById = async (id) => {
    return await axiosInstance.get(`/forms/${id}`);
};

const deleteForm = async (id) => {
    return await axiosInstance.delete(`/forms/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllForm,
    getFormById,
    getFormByPageIndex,
    deleteForm,
};
