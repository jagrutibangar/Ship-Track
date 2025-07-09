import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { setDoc, getDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Add user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user", // default role
    });
    return user;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const logout = () => signOut(auth);

   useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setCurrentUser(user);

    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const fetchedRole = userDoc.data().role;
        console.log("Role fetched:", fetchedRole); // ✅ Check here
        setRole(fetchedRole);
      }
    } else {
      setRole(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  return (
    <AuthContext.Provider value={{ currentUser, role, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
