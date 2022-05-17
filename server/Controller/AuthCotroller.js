import express from "express";
import bcrypt from "bcrypt";
import User from "../Model/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const passwordHashed = await bcrypt.hash(password, 10);

  let user = await User.findOne({ username });
  if (user) return res.status(409).send("User already exists");

  user = await User.create({ username, password: passwordHashed });

  const token = jwt.sign(user.toJSON(), process.env.TOKEN);

  res.status(200).send({ token, user });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).send("User doesnt exist");
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) return res.status(401).send("Invalid password");

  const token = jwt.sign(user.toJSON(), process.env.TOKEN);

  res.status(200).send({ token, user });
});

export default router;
