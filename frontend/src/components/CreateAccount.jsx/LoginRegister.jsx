import React from "react";
import { useState } from "react";
import "./LoginRegister.css";
import { useAuth } from "../../Store/auth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);  // Toggle between login and register
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { StoreTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLogin(false)
    console.log(e)
    const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify(formData);

    try {
      const response = await fetch(url, { method, headers, body });

      if(response.ok){
        const login_data = await response.json();
        console.log('login',login_data)
        StoreTokenInLS(login_data.token)
        toast.success(login_data.msg)
        setFormData({
          email: "",
          password: "",
        })
        navigate('/')
      }else{
        const error_msg = await response.json();
        toast.error(error_msg.msg)
      }
    } catch (error) {
      // toast.error(login_data);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="perform-auth-container">
      <div className="auth-form">
        <div className="login-form">
          <h2 className="form-heading">Login</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-field">
              <label htmlFor="email">Username and email address*</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="name"
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
        <div className="register-form">
          <h2 className="form-heading">Register</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-field">
              <label htmlFor="email">Email address*</label>
              <input
                type="text"
                name="email"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="term-condition">
              <p>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <span style={{ color: "rgba(170, 171, 116, 1)" }}>
                  privacy policy.
                </span>
              </p>
            </div>
            <input type="submit" value="Register" className="auth-form-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
