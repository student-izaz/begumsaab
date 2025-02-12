import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { useAuth } from '../../Store/auth';

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = useAuth()
  const isAdmin = user.user.isAdmin;

  if(!isAdmin){
    return navigate('/my-account')
  }

  return (
    <div>
      <AdminHeader/>
      <AdminNavbar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
