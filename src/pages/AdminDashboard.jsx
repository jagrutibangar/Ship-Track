import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const { role } = useAuth();
  const [view, setView] = useState("home"); // default view
  const [shipments, setShipments] = useState([]);

useEffect(() => {
  let unsub;
  if (role === "admin" && view === "shipments") {
    unsub = onSnapshot(collection(db, "shipments"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
    id: doc.id, ...doc.data(),
      }));
    setShipments(data);
    });
    }

    return () => {
      if (unsub) unsub(); }; 
    }, [role, view]);

const STATUS_STAGES = ["Pending", "In Transit", "Delivered"]; 

const handleShipmentUpdate = async (shipment) => {
  if (!shipment) return;
  const currentStatusIndex = STATUS_STAGES.indexOf(shipment.status);
  if (currentStatusIndex === -1 || currentStatusIndex >= STATUS_STAGES.length - 1) return;

  const newStatus = STATUS_STAGES[currentStatusIndex + 1];

  try {
    await updateDoc(doc(db, "shipments", shipment.id), {
      status: newStatus,
    });
    alert(`Status updated to: ${newStatus}`);
  } catch (err) {
    console.error("Error updating shipment:", err);
    alert("Failed to update status.");
  }
};


    if (role !== "admin") {
    return <p className="text-red-500">Access Denied</p>;
    }

    return (
    <>
     <Navbar/>
    <div className="bg-blue-50 h-screen">
      <h1 className="text-4xl font-bold mb-6 ml-40 p-5">Welcome Admin</h1>

      {/* Navigation buttons */}
      <div className="flex gap-4 mb-6">
        <p className="ml-40 text-xl mt-10">View and Update Shipments here!</p>
        <button
        onClick={() => setView("shipments")}
        className={`px-4 py-2 rounded-4xl ml-50 mt-10 cursor-pointer ${view === "shipments" ? "bg-blue-600 text-white" : "bg-blue-600 text-amber-50 "}`}>
        View Shipments
        </button>
      </div>

      
      {view === "shipments" && (
        <div className="bg-blue-50">
          <h2 className="text-xl font-bold mb-4 ml-24">All Shipments</h2>
          {shipments.length === 0 && <p>No shipments found.</p>}
          {shipments.map((shipment) => (
            <div key={shipment.id} className="bg-white p-4 mb-3 shadow rounded-2xl ml-20 w-[73rem]">
              <p><strong>ID:</strong> {shipment.id}</p>
              <p><strong>Receiver:</strong> {shipment.receiver}</p>
              <button 
                className='bg-blue-600 h-10 rounded-4xl p-2 text-amber-50 mt-4 cursor-pointer'
                onClick={() => handleShipmentUpdate(shipment)}>Update Status</button> 
            </div>
          ))}
        </div>
      )}
    </div>

    </>
  );
};

export default AdminDashboard;
