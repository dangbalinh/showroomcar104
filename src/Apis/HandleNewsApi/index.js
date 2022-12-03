import axiosInstance from "../axiosInstance";

const getAllNews = async () => {
    return await axiosInstance.get("/news");
};

const getNewsByPageIndex = async (index) => {
    return await axiosInstance.get(`/news?pageIndex=${index}`);
};

const getThreeNews = async () => {
    return await axiosInstance.get("/news?pageIndex=0&pageSize=3");
};

const getNewsById = async (id) => {
    return await axiosInstance.get(`/news/${id}`);
};

const createNews = async (data) => {
    return await axiosInstance.post("/news", data);
};

const updateNews = async (id, data) => {
    return await axiosInstance.put(`/news/${id}`, data);
};

const deleteNews = async (id) => {
    return await axiosInstance.delete(`/news/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllNews,
    getNewsByPageIndex,
    getNewsById,
    getThreeNews,
    createNews,
    updateNews,
    deleteNews
};
