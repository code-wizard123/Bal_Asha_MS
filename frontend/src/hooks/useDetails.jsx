import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const UseDetails = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get('token');
      if (token) {
        // Parse the token to extract the role information
        const decodedToken = await parseToken(token);
        console.log(decodedToken)
        // Do something with the role, such as storing it in state or performing role-specific logic
        if (decodedToken) {
          setIsAuthenticated(true);
        }
      }
    };

    checkAuthentication();
  }, []);

  const parseToken = async (token) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/parsetoken', { token });
      return response.data;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  return isAuthenticated;
};

export default UseDetails;
