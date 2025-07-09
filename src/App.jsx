// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/HomePage";
import { useAuth } from "./contexts/AuthContext";
import CreateShipment from "./components/CreateShipment";
import CreateShipmentPage from "./pages/CreateShipmentPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import TrackShipmentPage from "./pages/TrackShipmentPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";




const App = () => {
  const { currentUser } = useAuth();
  const role = useAuth();

  return (

    <>
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
        
        {role === "user" && <Route path="/dashboard" element={<DashboardPage />} />}
        {role === "admin" && <Route path="/admin" element={<AdminDashboard />} />}
      <Route path="/home" element={<HomePage/>} />
      <Route path="/create-shipment" element={currentUser ? <CreateShipmentPage /> : <Navigate to="/login" />}/>
      <Route path="/admin" element={
  <AdminRoute>
    <AdminDashboard />
  </AdminRoute>
} />

<Route path="/dashboard" element={
  <UserRoute>
    <DashboardPage />
  </UserRoute>
} />
      <Route path="/track/:shipmentId" element={<TrackShipmentPage />} />
      </Routes>
    </Router>

    </>
  );
};

export default App;
