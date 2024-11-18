import apiClient from './apiClient';

export const signup = async (userData) => {
  try {
    const response = await apiClient.post('/Auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const login = async (credentials, navigate) => {
  try {
    const response = await apiClient.post('/Auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    const userRole = response.data.role;
    localStorage.setItem('role', userRole);
    // Check user role and redirect accordingly
    console.log(response.data);
    // Assumes role is returned from the API
    console.log(userRole);

    if (userRole === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const logout = () => {
  localStorage.removeItem('token');
};
