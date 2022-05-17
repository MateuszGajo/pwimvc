import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import AuthController from "./Controller/AuthCotroller.js";
import ActivityController from "./Controller/ActivityController.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("mongo db connected")
);

server.use("/auth", AuthController);
server.use("/activity", ActivityController);

server.use(express.static(path.resolve(__dirname, "../client/build")));
server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(process.env.PORT || 5000, () =>
  console.log("server has started")
);
