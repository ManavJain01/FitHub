// Importing Axios Packages
import axios from 'axios'

// Signup
export const signup = async (data) => {
  try {
    const { userName, email, password } = data;
    
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_ServerLocation}/user/signup`, { name: userName, email: email, password: password})

    if (response.status !== 200) {
      throw new Error('Failed to Sign Up');
    }

    return response.data;
  } catch (error) {
    console.log('Error Signing Up:', error);
    return {};
  }
}

// Login
export const login = async (data) => {
  try {
    const { userName, password } = data;
    
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_ServerLocation}/user/login`, { name: userName, password: password})
    
    if (response.status !== 200) {
      throw new Error('Failed to LogIn');
    }

    return response.data;
  } catch (error) {
    console.log('Error Logging In:', error);
    return {};
  }
}