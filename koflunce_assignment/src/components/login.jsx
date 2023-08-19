import React from "react";
import "../styles/login.css"
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
const navigate=useNavigate()
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          `https://user-register-ubmr.onrender.com/users?email=${loginData.email}`
        );

        if (!response.ok) {

          console.log("User not found");
          return;
        }

        const userData = await response.json();

        if (
          userData.length === 1 &&
          userData[0].password === loginData.password
        ) {
          
  localStorage.setItem("loggedInUser", JSON.stringify(userData[0]));
  alert("User logged in successfully");
  navigate("/user")
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
       
      }

      // Clear the login form after login attempt
      setLoginData({
        email: "",
        password: "",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (<div>
  <div  className="login-container">
        
        <h2  className="login-title">Login</h2>
        <form  className="login-form" onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
  
          <button type="submit">Login</button>
          <p>New User? <Link to="/">Register </Link></p>
        </form>
      </div>
    
  </div>
  
  );
};

export default Login;
