import React, { useEffect } from 'react';
import { useAuth } from '../../Store/auth';
import { Navigate } from 'react-router-dom';

function Logout() {
  const { logoutUser } = useAuth();

  useEffect(()=>{
    logoutUser();
  }, [logoutUser]);

  return (
    <Navigate to="/my-account"></Navigate>
  )
}

export default Logout;
