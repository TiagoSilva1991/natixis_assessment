import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const Authentication = () => {
  const { user, login } = useAuth();
  if (user) return <Navigate to="/dashboard" />;

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3000/users`, {
        params: { email: credentials.email, password: credentials.password },
      });
      if (res.data.length > 0) {
        login(res.data[0]);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Please sign up.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3000/users?email=${credentials.email}`);
      if (res.data.length === 0) {
        await axios.post("http://localhost:3000/users", credentials);
        alert("Registered successfully");
        setIsSignUp(false);
      } else {
        alert("Email already exists");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignUp) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <div className="app-page authentication-page-wrapper">
      <div className="app-container">
        <div className="authentication-page">
          <div className="authentication-form-wrapper">
            <h1 className="app-title authentication-form-title">{isSignUp ? 'Sign up' : 'Login'}</h1>
            <form className="authentication-form" onSubmit={handleSubmit}>
              {isSignUp && <input type="text" name="username" placeholder="Username" onChange={handleChange} />}
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <div className="authentication-form-btns">
                <button type="submit" className="app-btn">submit</button>
                <button type="button" className="app-text-btn" onClick={() => setIsSignUp(!isSignUp)}>{!isSignUp ? 'sign up' : 'login'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
