//Define api endpoints here 


import axios from '../utils/axios';
import { BASE_URL } from '../config/config';


// API call to authenticate user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { "email": email, "password": password });
    return { 
        message: response.data.message, 
        status: response.data.status, 
        data: response.data.data 
        }; // Assuming your API returns a JSON response with data
  } catch (error) {
    const { response } = error;
    if (response) {
      // Error response from the backend
      const { data, status } = response;
      return { message: data.message, status: status };
    } else {
      // Network error or other issues
      return { message: 'An error occurred. Please try again later.', status: 500 };
    }
  }
};

export const signup = async (userName, email, password, senderAddress, privateKey) => {
  console.log(userName, email, password, senderAddress, privateKey);
  try {
    const response = await axios.post(`${BASE_URL}/signup`, { "userName": userName, "email": email, "password": password, "sender_address": senderAddress, "private_key": privateKey });
    return { 
        message: response.data.message, 
        status: response.data.status, 
        data: response.data.data 
        }; // Assuming your API returns a JSON response with data
  } catch (error) {
    const { response } = error;
    if (response) {
      // Error response from the backend
      const { data, status } = response;
      return { message: data.message, status: status };
    } else {
      // Network error or other issues
      return { message: 'An error occurred. Please try again later.', status: 500 };
    }
  }
}

export const getDocuments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blockchain/get-documents`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return { 
        message: response.data.message, 
        status: response.data.status, 
        data: response.data.data 
        }; // Assuming your API returns a JSON response with data
  } catch (error) {
    const { response } = error;
    if (response) {
      // Error response from the backend
      const { data, status } = response;
      return { message: data.message, status: status };
    } else {
      // Network error or other issues
      return { message: 'An error occurred. Please try again later.', status: 500 };
    }
  }
}

export const checkValidity = async (hash) =>{

  try{
    const response = await axios.get(`${BASE_URL}/blockchain/verify-document/?documentHash=${hash}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if(response.data.status === 200){
      return true
    }else{
      return false
    } // Assuming your API returns a JSON response with data
  }catch(error){
    console.log(error)
  }

}

export const addDocument = async (hashHex, fileName) =>{
  const hash = hashHex;
  try{
    const response = await axios.get(`${BASE_URL}/blockchain/add-document/?documentHash=${hash}&fileName=${fileName}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if(response.data.status === 200){
      return true
    }else{
      return false
    } // Assuming your API returns a JSON response with data
  }catch(error){
    console.log(error)
  }
}
