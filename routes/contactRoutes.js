import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const message = new Contact(req.body);
    await message.save();

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: "Failed to save message!" });
  }
});

export default router;
