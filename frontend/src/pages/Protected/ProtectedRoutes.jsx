import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ isAuthenticated, ...rest }) => {
  const navigate = useNavigate();
  if (isAuthenticated) {
    // If the user is authenticated, render the specified component
    return <Route {...rest} />;
  } else {
    navigate("/login")
  }
};

export default ProtectedRoutes;