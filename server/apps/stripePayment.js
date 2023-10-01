import { Router, query } from "express";
import { pool } from "../utils/db.js";
import stripe from "stripe";
import dotenv from "dotenv";

const stripePaymentRouter = Router();
dotenv.config();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

stripePaymentRouter.post("/create-payment-intent", async (req, res) => {
  const { price, limit, package_id } = req.body;
  console.log("ตัว limit ที่ได้มา", typeof limit);
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: price * 100, // ต้องหาร 100 หน่วยเป็นสตางค์
      currency: "thb",
      description: JSON.stringify({ limit, package_id }),
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process" });
  }
});

stripePaymentRouter.post("/", async (req, res) => {
  const paymentData = req.body.paymentData;
  const payment_intent = await stripeClient.paymentIntents.retrieve(
    paymentData
  );

  const user_id = req.body.state.id;
  const status = payment_intent.status;
  const payment_id = payment_intent.id;
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 30); // calculate end_date
  const merry_limit = JSON.parse(payment_intent.description).limit;
  const package_id = JSON.parse(payment_intent.description).package_id;

  try {
    const userPackagePaid = await pool.query(
      `INSERT INTO transaction (status, payment_id, start_date, end_date, user_id, merry_limit, package_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        status,
        payment_id,
        currentDate,
        endDate,
        user_id,
        merry_limit,
        package_id,
      ]
    );

    if (userPackagePaid.rowCount === 1) {
      return res.status(201).json({ message: "Transaction has been created" });
    } else {
      console.error("Failed to create a transaction");
      return res.status(500).json({ error: "Failed to create a transaction" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Failed to add to the database" });
  }
});

export default stripePaymentRouter;
