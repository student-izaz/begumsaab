import React, { useContext, useState } from "react";
import "./LoginRegister.css";
import { AuthContext, useAuth } from "../../Store/auth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { StoreTokenInLS } = useAuth();
  const navigate = useNavigate();
  const { API_URL } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isLogin ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`;
    const method = "POST";
    const headers = { "Content-Type": "application/json" };

    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData; // Include name field for registration

    try {
      const response = await fetch(url, { method, headers, body: JSON.stringify(payload) });

      if (response.ok) {
        console.log(response)
        const login_data = await response.json();
        StoreTokenInLS(login_data.data.token);
        toast.success(login_data.msg);
        setFormData({ username: "", email: "", password: "" });
        navigate('/');
      } else {
        const error_msg = await response.json();
        toast.error(error_msg.msg);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <>    
    <div className="perform-auth-container">
      <div className="auth-form">
        <div className="toggle-buttons">
          <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>
            Register
          </button>
        </div>
        
        {isLogin ? (
          <div className="login-form">
            <h2 className="form-heading">Login</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="input-field">
                <label htmlFor="email">Email address*</label>
                <input
                  type="email"
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
                  autoComplete="current-password"
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
        ) : (
          <div className="register-form">
            <h2 className="form-heading">Register</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="input-field">
                <label htmlFor="name">Full Name*</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="email">Email address*</label>
                <input
                  type="email"
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
                  autoComplete="new-password"
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
        )}
      </div>
    </div>
    </>
  );
};

export default LoginRegister;
