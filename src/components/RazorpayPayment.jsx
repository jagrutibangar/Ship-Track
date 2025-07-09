import React from "react";
import { useAuth } from "../contexts/AuthContext";


const RazorpayPayment = ({ amount, shipmentId }) => {
  const { currentUser } = useAuth(); 

  const handlePayment = async () => {
    try {
      const response = await fetch("https://corsproxy.io/?https://nam5-shipment-tracker-dfee0.cloudfunctions.net/createRazorpayOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }), 
      });

      const data = await response.json();
      console.log(data);

      if (data.error) {
        alert("Razorpay Error: " + data.error);
        return;
      }

      const options = {
        key: "rzp_test_xznWgrwgvntqxl",
        amount: data.amount,
        currency: data.currency,
        name: "Shipment Tracker",
        description: "Shipment Payment",
        order_id: data.orderId,
        
        handler: function (response) {
          alert("Payment successful. ID: " + response.razorpay_payment_id);

        },
        prefill: {
          email: currentUser?.email || "test@example.com",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to initiate payment.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-6 py-2 rounded-full cursor-pointer -mt-30"
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayPayment;
