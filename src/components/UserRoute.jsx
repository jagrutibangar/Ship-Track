import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UserRoute = ({ children }) => {
  const { currentUser, role } = useAuth();

  if (!currentUser) return <Navigate to="/" />;
  if (role !== "user") return <Navigate to="/admin" />;

  return children;
};

export default UserRoute;
