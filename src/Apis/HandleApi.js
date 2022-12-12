import axiosInstance from "./axiosInstance";

const getAllCar = async () => {
    return await axiosInstance.get("/cars");
};

const getCarByPageIndex = async (index) => {
    return await axiosInstance.get(`/cars?pageIndex=${index}`);
};

const getCarByPageIndexBrand = async (brand, index) => {
    return await axiosInstance.get(`/cars?thuonghieu=${brand}&pageIndex=${index}`);
};


const getSevenCars = async (index) => {
    return await axiosInstance.get("/cars?pageIndex=0&pageSize=7");
};
const getSixCarsByBranch = async (branch) => {
    return await axiosInstance.get(`/cars?ten=&thuonghieu=${branch}&pageIndex=0&pageSize=6`);
};

const getCarById = async (id) => {
    return await axiosInstance.get(`/cars/${id}`);
};

const getCarByName = async (name) => {
    return await axiosInstance.get(`/cars?search=${name}`);
};

const getCarByBrand = async (brand) => {
    return await axiosInstance.get(`/cars?thuonghieu=${brand}`);
};

const getCarAdvice = async (advice) => {
    return await axiosInstance.get(`/cars?advice=${advice}`);
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

 //eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllCar,
    getCarById,
    getSevenCars,
    getCarByPageIndex,
    getCarByName,
    getCarByBrand,
    getCarAdvice,
    createCar,
    updateCar,
    deleteCar,  
    getSixCarsByBranch,
    getCarByPageIndexBrand 
};
