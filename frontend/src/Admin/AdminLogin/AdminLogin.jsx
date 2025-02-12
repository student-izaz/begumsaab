import './AdminLogin.css';
import { useState } from "react";
import { useAuth } from "../../Store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AdminHeader from '../AdminHeader/AdminHeader';

const AdminLogin = () => {
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setAdminLogin({
      ...adminLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminLogin)
    })
    const data = await response.json();
    if(response.ok){
      toast.success(data.msg)
      navigate("../admin");
    }else{
      toast.error(data.msg)
    }
  };

  return (
    <>
    <AdminHeader/>
    <div className='admin-login'>
      <div className="admin-login-form">
        <h2 className="form-heading">Admin Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-field">
            <label htmlFor="email">Username and email address*</label>
            <input
              type="text"
              name="email"
              value={adminLogin.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              name="password"
              value={adminLogin.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div>
              <input type="checkbox" />
              <span> Remember me</span>
            </div>
            <input type="submit" value="Login" className="auth-form-btn" />
            <p className="lost_password">Lost your password?</p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AdminLogin;
