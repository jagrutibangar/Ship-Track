import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "shipments"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShipments(data);
    });

    return unsubscribe;
  }, [currentUser.uid]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-6 bg-gray-100">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold ml-20">📦 Shipment Dashboard</h1>
       
      </header>

      <main>
        <div className="flex justify-between mb-4 ml-20 w-[70rem]">
          <h2 className="text-xl font-semibold">Your Shipments</h2>
          <button
            onClick={() => navigate("/create-shipment")}
            className="bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer"
          >
            + Create Shipment
          </button>
        </div>

        <div className="grid gap-4 ml-20">
          {shipments.length === 0 ? (
            <p>No shipments yet.</p>
          ) : (
            shipments.map((shipment) => (
              <div key={shipment.id} className="bg-white p-4 rounded-xl shadow">
                <p><strong>To:</strong> {shipment.receiver}</p>
                <p><strong>Address:</strong> {shipment.address}</p>
                <p><strong>Size:</strong> {shipment.packageSize}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 font-semibold ${
                    shipment.status === "Pending" ? "text-yellow-500" :
                    shipment.status === "In Transit" ? "text-blue-600" :
                    "text-green-600"
                  }`}>
                    {shipment.status}
                  </span>
                </p>
                <button onClick={() => navigate(`/track/${shipment.id}`)}
                className="h-10 rounded-4xl w-20 p-2 bg-blue-600 font-bold text-amber-50 mt-4 cursor-pointer ">Track</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>

    </>
  );
};

export default DashboardPage;
