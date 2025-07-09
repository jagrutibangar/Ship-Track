import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const TrackShipmentPage = () => {

    const {shipmentId} = useParams();
    const navigate = useNavigate();
    const [shipment, setShipment] = useState(null);

    useEffect(() => {
        //callback function to get shipment Id from the firebase DB
        const fetchShipment = async () => {
        try {
        const docRef = doc(db, "shipments", shipmentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setShipment({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert("Shipment not found!");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error fetching shipment:", err);
      }
    }
     fetchShipment();
  }, [shipmentId, navigate]);

   if (!shipment) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <button
        className="mb-4 text-white bg-blue-600 text-xl p-2 font-bold cursor-pointer rounded-4xl"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">📦 Shipment Details</h2>

        <p><strong>Shipment ID:</strong> {shipment.id}</p>
        <p><strong>Sender:</strong> {shipment.sender}</p>
        <p><strong>Receiver:</strong> {shipment.receiver}</p>
        <p><strong>Address:</strong> {shipment.address}</p>
        <p><strong>Package Size:</strong> {shipment.packageSize}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`font-semibold ${
            shipment.status === "Pending"
              ? "text-yellow-500"
              : shipment.status === "In Transit"
              ? "text-blue-500"
              : "text-green-600"
          }`}>
            {shipment.status}
          </span>
        </p>
      </div>
    </div>
  );
}

export default TrackShipmentPage;
