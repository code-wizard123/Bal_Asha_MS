import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useDetails = () => {
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // Parse the token to extract the role information
      const decodedToken = parseToken(token);

      // Do something with the role, such as storing it in state or performing role-specific logic
      console.log('message', decodedToken);
    }
  }, []);

  // Replace this with your actual token parsing logic
  const parseToken = (token) => {
    // Assuming the token is in JWT format, you can use a JWT library or decode it manually
    // This is just a placeholder implementation for demonstration purposes
    const decodedToken = { message: token };
    return decodedToken;
  };
};

export default useDetails;