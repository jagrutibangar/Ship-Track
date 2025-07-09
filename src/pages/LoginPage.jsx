import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



const LoginPage = () => {

  const { login, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    await login(email, password);

    setTimeout(() => {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/home");
      } else {
        setError("No role assigned. Contact Admin.");
      }
    }, 1000);
  } catch {
    setError("Failed to login. Please check credentials.");
  }
};

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <>
    <div className="bg-[url('./assets/home.jpg')] bg-cover bg-no-repeat h-screen">
      <div className='w-80 flex flex-col justify-self-center'>
      <form onSubmit={handleLogin}>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <input className='h-10  rounded-4xl pl-4 m-5 bg-amber-50 mt-30 w-80' type="email"  placeholder='Email' value={email}   onChange={(e) => setEmail(e.target.value)}/> 
      <input className='h-10  rounded-4xl pl-4 m-5 bg-amber-50 w-80' type="password"  placeholder='Password' value={password}
          onChange={(e) => setPassword(e.target.value)} />
      <button className='h-12 rounded-4xl pl-4 m-5 bg-blue-600 text-amber-50 cursor-pointer w-80'>
      Login</button>
      <div className='w-[18rem] justify-between flex -mt-3 justify-self-center'>
        <span className='font-medium text-xs cursor-pointer text-gray-700 ml-3' onClick={handleCreateAccount}>Create account</span>
        <span className='font-medium text-xs cursor-pointer  text-gray-700'>Need Help?</span>
      </div>
      </form>
    
      </div>
    </div>
    </>
  );
}

export default LoginPage;
