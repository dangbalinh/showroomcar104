import axiosInstance from './axiosInstance';


const getCarById = async (id) => {
    return await axiosInstance.get(`/cars/${id}`);
};

const getEmployeeById = async(id) =>{
    return await axiosInstance.get(`/users/employees/${id}`);
}

const getEmployeeByName = async (name) => {
    return await axiosInstance.get(`/users/employees?name=${name}`);
};

const getEmployeeBySearch = async (search) =>{
    return await axiosInstance.get(`/users/employees?search=${search}`);
}

const getEmployeeByMauser = async (mauser) => {
    return await axiosInstance.get(`/users/employees?mauser=${mauser}`);
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
    getEmployeeBySearch,
};