import React,{useState} from 'react'
import { Link } from "react-router-dom";
const User = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  if (!user) {
    // User is not logged in, handle this scenario (e.g., redirect to login page)
    return <div> 
        <h1>User not logged in.</h1>
        <Link to="/login">Login </Link>
    </div>;
  }
  return (
    <div>
    <h2>User Details</h2>
    <div>
      <strong>Name:</strong> {user.name}
    </div>
    <div>
      <strong>Email:</strong> {user.email}
    </div>
    <div>
      <strong>Password:</strong>{" "}
      {showPassword ? user.password : "*".repeat(user.password.length)}
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide Password" : "Show Password"}
      </button>
    </div>
    <button onClick={handleLogout}>Logout</button>
  </div>
  )
}

export default User