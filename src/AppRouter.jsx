import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
