import { Router, query } from "express";
import { pool } from "../utils/db.js";
import stripe from "stripe";

const stripePaymentRouter = Router();
const stripeClient = stripe('sk_test_51NuxGCAr6dsWC1udD56EvBGibKJUOAKNeZS7YUt7xnzri5Na8wwhdghcwzq65xTQfHaC2KKeuiYPr60SI50gUYeS00e06OT16E');

// stripePaymentRouter.get("/", async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     return res.send('น้องอ๋องแปดน่ารักที่สุดในโลก')
//     } catch (error) {
//     console.error("ไม่เข้าตั้งแต่ get เลยอิ่ม:", error);
//     res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
//     }
// });

const calculateOrderAmount = (items) => {
  return 50000;
}

stripePaymentRouter.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body
    const paymentIntent = await stripeClient.paymentIntents.create({
        amount: calculateOrderAmount(items), // ต้องหาร 100 หน่วยเป็นสตางค์
        currency: 'thb',
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.send({
    clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด แก้ไข้ด่วนๆ เจ้าอิ่ม :", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ post บ่ได้เด้อ" });
  }
});

stripePaymentRouter.post("/:user_id", async (req, res) => {
  console.log("ลอง client secret ว่าขึ้นไหม", req.body.paymentData);
  const paymentData = req.body.paymentData;
  console.log('แกะออกมาได้', paymentData);
  const payment_intent = await stripeClient.paymentIntents.retrieve(paymentData);
  console.log("นี่คือ payment intent", payment_intent);
  const user_id = req.body.state.id;
  console.log("user id คือ", user_id);
  
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
    // res.status(200).json({ received: true });
});

export default stripePaymentRouter;
