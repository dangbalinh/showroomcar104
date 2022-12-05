import axios from 'axios';
import axiosInstance from './axiosInstance';

// const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhhZjRlNzRiODlkYjI3ODYxOWIzNWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzAxODQ1NzgsImV4cCI6MTY3Mjc3NjU3OH0.G2ShnIT4lHu-TcxqP1kMGg9lePldfQQrvpYCJVjx2pc';

// const apiURL = 'https://showroomcar104.onrender.com/';
// const authAxiosInstance = axios.create({
//     baseURL: apiURL,
//     headers: {
//         'Authorization': `Bearer ${token}`
//     }
// });

// authAxiosInstance.interceptors.response.use(
//     function (response) {
//       return response.data;
//     },
//     function (error) {
//       return Promise.reject(error);
//     },
//   );


const getCarById = async (id) => {
    return await axiosInstance.get(`/cars/${id}`);
};

const getEmployeeById = async(id) =>{
    return await axiosInstance.get(`/users/employees/${id}`);
}

const getEmployeeByName = async (name) => {
    return await axiosInstance.get(`/users/employee?name=${name}`);
};

const getEmployeeByMauser = async (mauser) => {
    return await axiosInstance.get(`/users/employee?mauser=${mauser}`);
};


const getEmployeeByPageIndex = async (index) => {
    return await axiosInstance.get(`/users/employees?pageIndex=${index}`);
};

const deleteEmployee = async (id) => {
    return await axiosInstance.delete(`/users/employees/${id}`);
};

const createEmployee = async (data) => {
    return await axiosInstance.post(`/users/employees`, data);
}

const updateEmployee = async (id, data) => {
    return await axiosInstance.put(`/users/employees/${id}`, data)
}

export default {
    getCarById,
    getEmployeeById,
    getEmployeeByMauser,
    getEmployeeByName,
    getEmployeeByPageIndex,
    deleteEmployee,
    createEmployee,
    updateEmployee,
};