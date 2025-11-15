import React, { useContext, useState } from "react";
import "./LoginRegister.css";
import { AuthContext, useAuth } from "../../Store/auth";
import { toast } from "react-toastify";
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

  const handleLogin = async () => {
  const loginPayload = {
    email: formData.email,
    password: formData.password,
  };

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('response ok hai')
      if (result?.token) {
        StoreTokenInLS(result.token);
        toast.success(result.msg || "Login successful");
        navigate("/home");
      }
      setFormData({ username: "", email: "", password: "" });
    } else {
      toast.error(result.msg || "Login failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Login error! Please try again.");
  }
};

const handleRegister = async () => {
  const registerPayload = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerPayload),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      toast.success(result.msg || "Registered successfully");
      setFormData({ username: "", email: "", password: "" });
      setIsLogin(true); // Switch to login form after register
    } else {
      toast.error(result.msg || "Registration failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Registration error! Please try again.");
  }
};
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }   
  };

  return (
    <div className="perform-auth-container">
      <div className="auth-form">
        <div className="toggle-buttons">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={isLogin ? "active" : ""}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={!isLogin ? "active" : ""}
          >
            Register
          </button>
        </div>

        <h2 className="form-heading">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="form">
          {!isLogin && (
            <div className="input-field">
              <label htmlFor="username">Full Name*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
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
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {isLogin && (
            <div className="form-row">
              <div>
                <input type="checkbox" />
                <span> Remember me</span>
              </div>
              <p className="lost_password">Lost your password?</p>
            </div>
          )}

          {!isLogin && (
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
          )}

          <input
            type="submit"
            value={isLogin ? "Login" : "Register"}
            className="auth-form-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
