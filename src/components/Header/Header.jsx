import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/userIcon";
import { useAuth } from "../../AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="app-header">
      <div className="app-container">
        <div className="app-header-content">
          <img src="https://portugalevents.natixis.com/media/events/default/assets/header-logo-brand.png" alt="logo"></img>
          <div className="app-header-user-wrapper">
            <button type="button" className={`app-btn icon-btn ${isUserInfoOpen ? 'active' : ''}`} onClick={() => setIsUserInfoOpen(!isUserInfoOpen)}>
              <UserIcon />
              <p>{user?.username}</p>
            </button>
            {isUserInfoOpen && (
              <div className="app-header-user">
                <button type="button" className="app-btn" onClick={() => { handleLogout(); }}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Dashboard;
