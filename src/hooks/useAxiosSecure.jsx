import  { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';


const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401 || status === 403) {
            // Logout user and redirect to login page
            await logoutAndRedirect();
          }
        }
        return Promise.reject(error);
      }
    );

    const logoutAndRedirect = async () => {
      await logOut(); // Assuming logOut is the logout method from AuthContext

      // Redirect user to login page
      navigate('/login');
    };
  }, [axiosSecure, logOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
