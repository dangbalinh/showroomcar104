import axiosInstance from "./axiosInstance";

const getAllForm = async () => {
    return await axiosInstance.get("/forms");
};

const getFormByDate = async (data) => {
    return await axiosInstance.get(
        `/forms?dateForm=${
            data.getDate() < 10 ? "0" + data.getDate() : data.getDate()
        }-${data.getMonth() + 1}-${data.getFullYear()}`
    );
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
    getFormByDate,
    deleteForm,
};
