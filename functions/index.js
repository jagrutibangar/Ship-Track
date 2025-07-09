import functions from "firebase-functions";
import { setGlobalOptions } from "firebase-functions/v2/options";
import { onRequest } from "firebase-functions/v2/https";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

setGlobalOptions({ maxInstances: 10 });

const razorpay = new Razorpay({
  key_id: functions.config().razorpay.key_id,
  key_secret: functions.config().razorpay.key_secret,
});


// Initialize CORS middleware
const corsHandler = cors({ origin: true });

export const createRazorpayOrder = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    console.log("Received request to create Razorpay order:", req.body);

    const { amount, currency = "INR" } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    try {
      const order = await razorpay.orders.create({
        amount: amount * 100, // Convert to paisa
        currency,
        receipt: `rcpt_${Date.now()}`,
      });

      return res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        razorpayKey: functions.config().razorpay.key_id, // Optional: can be sent to frontend
      });
    } catch (err) {
      console.error("Error creating Razorpay order:", err);
      return res.status(500).json({ error: "Failed to create Razorpay order" });
    }
  });
});
