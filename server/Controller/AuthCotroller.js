import express from "express";
import bcrypt from "bcrypt";
import User from "../Model/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/get",(req,res)=>{
    console.log("hello?")
})


router.post("/signup", async (req,res)=>{
    console.log("sign up");
    console.log(req.body);
    const {username,password} = req.body;
    const passwordHashed = await bcrypt.hash(password,10)

   let user =  await User.findOne({username});
    if(user)return res.status(409).send("User already exists")

    user = await User.create({username,password:passwordHashed})
    console.log(user)
    const token = jwt.sign(user.toJSON(),process.env.TOKEN)

    res.status(200).send({token})
})


router.post("/singin", async (req,res)=>{
    const {username,password} = req.body;

    const user = await User.findOne({username});
    if(!user) return res.status(404).send("User doesnt exist")
    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword) return res.status(401).send("Invalid password")

    const token = jwt.sign(user,process.env.TOKEN)

    res.status(200).send({token})
})

export default router