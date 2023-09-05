import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./utils/db.js";
import userRouter from "./app/user.js";

async function init() {
  dotenv.config();

  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/user', userRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });



  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}

init();
