/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from './axiosInstance';

const getAllCar = async () => {
  return await axiosInstance.get('/cars');
};

const getCarByPageIndex = async (index) => {
  return await axiosInstance.get(`/cars?pageIndex=${index}`);
};

// const getSevenNewCar = async () => {
//   return await axiosInstance.get('/cars');
// };

const getCarSearch = async (data) => {
  return await axiosInstance.post(`/cars/search`, data);
};


const getCarById = async (id) => {
  return await axiosInstance.get(`/cars/${id}`);
};

const getCarByName = async (name) => {
  return await axiosInstance.get(`/cars?ten=${name}`);
};

const getEnoughCarByTitle = async (data) => {
  return await axiosInstance.post('/cars/getEnoughCarByTitle', data);
};

const getCarByLabel = async (data) => {
  return await axiosInstance.post('/cars/getCarByLabel', data);
};

const createCar = async (data) => {
  return await axiosInstance.post('/cars', data);
};

const updateCar = async (id, data) => {
  return await axiosInstance.put(`/cars/${id}`, data);
};

const deleteCar = async (id) => {
  return await axiosInstance.delete(`/cars/${id}`);
};

export default {
  getAllCar,
  getCarSearch,
  getCarById,
  getCarByPageIndex, 
  getCarByName,
  getEnoughCarByTitle,
  getCarByLabel,
  createCar,
  updateCar,
  deleteCar,
};
