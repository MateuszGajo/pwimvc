import express from "express";
import cors from "cors";
import  mongoose from 'mongoose';
import 'dotenv/config' 
import AuthController from "./Controller/AuthCotroller.js";
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(cors()); 
mongoose.connect(process.env.DB_CONNECTION,()=>console.log("mongo db connected"))

server.get("/",(req,res)=>res.send("hello"))
server.use("/auth",AuthController)

server.listen(process.env.PORT || 3000,()=>console.log("server has started"))