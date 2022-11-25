import axiosInstance from './axiosInstance';

const getAllProducts = async (data) => {
  return await axiosInstance.get('/products');
};

const getProductsSearch = async (data) => {
  return await axiosInstance.post(`/products/search`, data);
};


const getPostById = async (data) => {
  return await axiosInstance.get(`/products/${data.postId}`);
};

const getProductsByTitle = async (data) => {
  return await axiosInstance.post('/products/getproductsByTitle', data);
};

const getEnoughproductsByTitle = async (data) => {
  return await axiosInstance.post('/products/getEnoughproductsByTitle', data);
};

const getProductsByLabel = async (data) => {
  return await axiosInstance.post('/products/getproductsByLabel', data);
};

const uploadImageToFirebase = async (data) => {
  return await axiosInstance.post('/products/upload', data.image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const createPost = async (data) => {
  return await axiosInstance.post('/products', data);
};

const updatePost = async (data) => {
  return await axiosInstance.put('/products', data);
};

const deletePost = async (data) => {
  return await axiosInstance.post('/products/delete', data);
};

export default {
  getAllProducts,
  getProductsSearch,
  getPostById,
  getProductsByTitle,
  getEnoughproductsByTitle,
  getProductsByLabel,
  uploadImageToFirebase,
  createPost,
  updatePost,
  deletePost,
};
