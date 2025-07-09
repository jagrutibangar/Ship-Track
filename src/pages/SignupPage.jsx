import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase"; // make sure db is exported from firebase.js
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.includes("@") || !email.includes(".")) {
      alert("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user", //always added
    });

      // Navigate to dashboard
      navigate("/home");

    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="bg-[url('./assets/home.jpg')] bg-cover bg-no-repeat h-screen flex items-center justify-center">
      <div className='w-80 flex flex-col -mt-50'>
        <form onSubmit={handleSignup}>
          <input
            className='h-10 rounded-4xl pl-4 m-5 bg-amber-50 w-80'
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className='h-10 rounded-4xl pl-4 m-5 bg-amber-50 w-80'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className='h-10 rounded-4xl pl-4 m-5 bg-amber-50 w-80'
            type="password"
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className='h-12 rounded-4xl pl-4 m-5 bg-blue-600 text-amber-50 cursor-pointer w-80'
          >
            Get Started
          </button>

          <div className='w-[18rem] flex justify-between -mt-3'>
            <span className='font-medium text-xs cursor-pointer text-gray-700 ml-10' onClick={handleLogin}>Login</span>
            <span className='font-medium text-xs cursor-pointer text-gray-700 '>Need Help?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
