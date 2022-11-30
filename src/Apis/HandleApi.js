import axiosInstance from "./axiosInstance";

const getAllCar = async () => {
    return await axiosInstance.get("/cars");
};

const getCarByPageIndex = async (index) => {
    return await axiosInstance.get(`/cars?pageIndex=${index}`);
};

const getCarById = async (id) => {
    return await axiosInstance.get(`/cars/${id}`);
};

const getCarByName = async (name) => {
    return await axiosInstance.get(`/cars?ten=${name}`);
};

const getCarByBrand = async (brand) => {
    return await axiosInstance.get(`/cars?thuonghieu=${brand}`);
};

const createCar = async (data) => {
    return await axiosInstance.post("/cars", data);
};

const updateCar = async (id, data) => {
    return await axiosInstance.put(`/cars/${id}`, data);
};

const deleteCar = async (id) => {
    return await axiosInstance.delete(`/cars/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllCar,
    getCarById,
    getCarByPageIndex,
    getCarByName,
    getCarByBrand,
    createCar,
    updateCar,
    deleteCar
};
