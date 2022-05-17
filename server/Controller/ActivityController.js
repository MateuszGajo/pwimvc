import express from "express";
import jwt from "jsonwebtoken";
import Activity from "../Model/Activity.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { title, description } = req.body;
  const token = req.header("authorization");
  const user = jwt.decode(token);
  if (!user) return res.status(401).send("invalid tokne");
  const userId = user._id;
  const resp = await Activity.create({
    title,
    description,
    userId,
  });
  res.status(200).send(resp);
});

router.get("", async (req, res) => {
  const token = req.header("authorization");
  const user = jwt.decode(token);
  if (!user) return res.status(401).send("invalid tokne");
  const userId = user._id;
  const resp = await Activity.find({
    userId,
  });
  res.status(200).send(resp);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const token = req.header("authorization");
  const user = jwt.decode(token);
  if (!user) return res.status(401).send("invalid tokne");
  const userId = user._id;
  const resp = await Activity.findOne({
    _id: id,
  });
  if (resp.userId !== userId)
    return res.status(403).send("Can't get not your activity");
  res.status(200).send(resp);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const token = req.header("authorization");
  const user = jwt.decode(token);
  if (!user) return res.status(401).send("invalid tokne");
  const activity = await Activity.findOne({
    _id: id,
  });
  if (!activity) return res.status(404).send("Activity doesn't exist");
  const userId = user._id;
  if (activity.userId !== userId)
    return res.status(403).send("Can't delete not your activity");

  await activity.remove();

  return res.status(200).send("activity deleted");
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const token = req.header("authorization");
  const user = jwt.decode(token);
  if (!user) return res.status(401).send("invalid tokne");
  const activity = await Activity.findOne({
    _id: id,
  });
  if (!activity) return res.status(404).send("Activity doesn't exist");
  const userId = user._id;
  if (activity.userId !== userId)
    return res.status(403).send("Can't edit not your activity");
  await activity.updateOne({
    title,
    description,
  });

  return res.status(200).send("activity updated");
});

export default router;
