import React from "react";
import { useState } from "react";
import axios from "axios"
const Register = () => {
  const [formData, setFormData] = useState({
    id:Date.now(),
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    address: "",
    gender: "",
    occupation: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = "This field is required";
      }
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit =(event) => {
    event.preventDefault();

    if (validateForm()) {
        axios
        .post("https://user-register-ubmr.onrender.com/users",formData)
        .then((res) => {
          console.log(res)
         
        })
        .catch((err) => {
          console.log(err)
        });
setFormData({
    
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    address: "",
    gender: "",
    occupation: "",
  })
     
    }

  };
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
  <label>Password:</label>
  <input
    type="password"
    name="password"
    value={formData.password}
    onChange={handleInputChange}
  />
  {errors.password && <span className="error">{errors.password}</span>}
</div>
<div>
  <label>Mobile Number:</label>
  <input
    type="text"
    name="mobile"
    value={formData.mobile}
    onChange={handleInputChange}
  />
  {errors.mobile && <span className="error">{errors.mobile}</span>}
</div>
<div>
  <label>Age:</label>
  <input
    type="number"
    name="age"
    value={formData.age}
    onChange={handleInputChange}
  />
  {errors.age && <span className="error">{errors.age}</span>}
</div>
<div>
  <label>Address:</label>
  <textarea
    name="address"
    value={formData.address}
    onChange={handleInputChange}
  />
  {errors.address && <span className="error">{errors.address}</span>}
</div>
<div>
  <label>Gender:</label>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleInputChange}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
  {errors.gender && <span className="error">{errors.gender}</span>}
</div>
<div>
  <label>Occupation:</label>
  <input
    type="text"
    name="occupation"
    value={formData.occupation}
    onChange={handleInputChange}
  />
  {errors.occupation && <span className="error">{errors.occupation}</span>}
</div>


        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
