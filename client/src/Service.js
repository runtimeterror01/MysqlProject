import axios from 'axios';
import config from './config';

const baseURL = config.baseURL;
const token = localStorage.getItem("token");

const baseurlconfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};



// Login
const login = async (userData) => {
    try {
      const response = await axios.post(`${baseURL}/login`, userData);
      const { data } = response;
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  // Signup
  const signup = async (userData) => {
    try {
   
      const response = await axios.post(`${baseURL}/signup`, userData);
      const { data } = response;
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };
  
  // Get all customer data
  const getAllCustomerData = async () => {
    try {
      const response = await axios.get(`${baseURL}/customer`, baseurlconfig);
      return response.data;
    } catch (error) {
      console.error('Get all customer data error:', error);
      throw error;
    }
  };
  
// Get customer data by ID
const getCustomerDataById = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/customer/${id}`,baseurlconfig);
      return response.data;
    } catch (error) {
      console.error(`Get customer data by ID error for ID: ${id}`, error);
      throw error;
    }
  };

  //insert customer
  const CreateCustomer=async(data)=>{
    try{
      // console.log(data)
      const response =await axios.post(`${baseURL}/customer`,data,baseurlconfig)
      return response;
    }catch(error)
    {
      throw error;
    }
  }
  
  // Update customer data by ID
  const updateCustomerDataById = async (id, updatedData) => {
    try {
      const response = await axios.put(`${baseURL}/customer/${id}`, updatedData,baseurlconfig);
      return response.data;
    } catch (error) {
      console.error(`Update customer data by ID error for ID: ${id}`, error);
      throw error;
    }
  };
  
  // Delete customer data by ID
  const deleteCustomerDataById = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/customer/${id}`,baseurlconfig);
      return response.data;
    } catch (error) {
      console.error(`Delete customer data by ID error for ID: ${id}`, error);
      throw error;
    }
  };
  
  
export {
  login,
  signup,
  CreateCustomer,
  getAllCustomerData,
  getCustomerDataById,
  updateCustomerDataById,
  deleteCustomerDataById,
};
