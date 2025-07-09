
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { currentUser, role } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (role !== "admin") {
    return <Navigate to="/dashboard" />; // redirect regular users
  }

  return children;
};

export default AdminRoute;
