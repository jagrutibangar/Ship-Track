import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import RazorpayPayment from "../components/RazorpayPayment";

const CreateShipmentPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [size, setSize] = useState("Small"); 

  const [shipmentId, setShipmentId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "shipments"), {
        sender: senderName,
        receiver: receiverName,
        address: destinationAddress,
        packageSize: size,
        status: "Pending",
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      setShipmentId(docRef.id); 
    } catch (err) {
      console.error("Error creating shipment:", err);
      alert("Failed to create shipment.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 p-6">
      <h2 className="text-2xl font-bold mb-4">📤 Create Shipment</h2>
      <button className="bg-blue-600 p-3 rounded-4xl text-amber-50 font-bold cursor-pointer ml-[70rem] -mt-20"
      onClick={() => {navigate('/home')}}>Back to Home</button>
      <form onSubmit={handleSubmit} className="p-6 rounded max-w-xl mx-auto">
        <label className="block mb-2 font-medium">Sender Name</label>
        <input
          className="w-full  p-2 mb-4 rounded-full bg-white"
          name="sender"
          placeholder="Sender Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Receiver Name</label>
        <input
          className="w-full p-2 mb-4 rounded-full bg-white"
          name="receiver"
          placeholder="Receiver Name"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Package Size</label>
        <select
          className="w-full p-2 mb-4 rounded-full bg-white"
          name="packageSize"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        >
          <option value="">Select size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <label className="block mb-2 font-medium">Delivery Address</label>
        <textarea
          className="w-full p-5 mb-4 rounded-full bg-white"
          rows="3"
          name="address"
          placeholder="Delivery Address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-full cursor-pointer"
        >
          Submit Shipment
        </button>
      </form>

    
      {shipmentId && (
        <div className="mt-6 ml-[60rem] cursor-pointer">
          <RazorpayPayment amount={500} shipmentId={shipmentId} />
        </div>
      )}
    </div>
  );
};

export default CreateShipmentPage;
