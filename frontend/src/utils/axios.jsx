//axios intercept to check if 401 response is received

import axios from 'axios';
// Create an Axios instance
const instance = axios.create();

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // If the request was successful, return the response
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error (Unauthorized)
      // Redirect the user to the login page
      console.log('401 error');
      window.location.href = '/login'; // Use this to navigate to /login
    }
    // If it's not a 401 error, return the error
    return Promise.reject(error);
  }
);

export default instance;
