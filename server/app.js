import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./utils/db.js";
import userRouter from "./apps/user.js";
import authRouter from "./apps/auth.js";
import userProfileRouter from "./apps/userProfile.js";
import { createClient } from "@supabase/supabase-js";
import packageRouter from "./apps/package.js";
import complaintRouter from "./apps/complaint.js";
import matchListRouter from "./apps/matchList.js";
import fs from "fs";
import { Server } from "socket.io";
import http from "http";
import userPackageRouter from "./apps/userPackage.js";

async function init() {
  dotenv.config();

  const app = express();
  const port = 4000;

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });
  const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

  app.use(express());
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use("/user-profile", userProfileRouter);
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/matchlist", matchListRouter);
  app.use("/packages", packageRouter);
  app.use("/complaint", complaintRouter);
  app.use("/user-package", userPackageRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  io.on("connection", (socket) => {
    console.log("a user connected." + socket.id);

    socket.on("joinRoom", ({ conversationId, users }) => {
      const roomID = `conversation_${conversationId}`;
      socket.join(roomID);
      socket.roomID = roomID;
      socket.client1_id = users[0];
      socket.client2_id = users[1];
    });

    socket.on('chat message', (message) => {
      io.emit('chat message', message);
    });


    socket.on("disconnect", () => {
      console.log("a user disconnected!");
    });
  });

  server.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}


init();
