import { Router, query } from "express";
import { pool } from "../utils/db.js";
import stripe from "stripe";

const stripePaymentRouter = Router();
const stripeClient = stripe('sk_test_51NuxGCAr6dsWC1udD56EvBGibKJUOAKNeZS7YUt7xnzri5Na8wwhdghcwzq65xTQfHaC2KKeuiYPr60SI50gUYeS00e06OT16E');

stripePaymentRouter.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
        amount: price * 100, // ต้องหาร 100 หน่วยเป็นสตางค์
        currency: 'thb',
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
  const payment_intent = await stripeClient.paymentIntents.retrieve(paymentData);

  const user_id = req.body.state.id;
  const status = payment_intent.status;
  const payment_id = payment_intent.id;
  const currentDate = new Date(); 
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 30); // calculate end_date

    try {
        const userPackagePaid = await pool.query(
            `INSERT INTO transaction (status, payment_id, start_date, end_date, user_id) VALUES ($1, $2, $3, $4, $5)`,
            [ status, payment_id, currentDate, endDate, user_id]
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
