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

const createNews = async (data, token) => {
    return await axiosInstance.post("/news", data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const updateNews = async (id, data, token) => {
    return await axiosInstance.put(`/news/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const deleteNews = async (id, token) => {
    return await axiosInstance.delete(`/news/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
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
