import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {


  const { logout } = useAuth();
  const navigate = useNavigate();

  const  handleLogout = async () => {
    await logout();
    navigate("/login");
  }

  return (
    <div className='h-20 shadow-black  flex flex-row p-5 '>
      <img src="" alt="Logo" />
      <ul className='flex flex-row space-x-15 ml-[35rem] font-bold mt-2 text-slate-800 cursor-pointer'>
        <li onClick={() => navigate("/create-shipment")}>Send</li>
        <li onClick={() => navigate("/dashboard")}>Recieve</li>
        <li onClick={() => navigate("/home")}>Track</li>
        <li onClick={() => navigate("/dashboard")}>Shipments</li>
      </ul>
    <div className='ml-[10rem] flex flex-row'>
    <img className='h-12 cursor-pointer' src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="User" />
    <button className='h-fit w-fit ml-10 border-2 p-2 rounded-2xl cursor-pointer hover:bg-slate-200 font-bold  text-slate-800'  onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
}

export default Navbar;
