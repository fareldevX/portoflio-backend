import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(404).json({ message: "Projects not found!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Server error!" });

    const project = await Project.findById(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: "ID not found!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.tech_stack) {
      data.tech_stack = JSON.parse(data.tech_stack);
    }

    const project = new Project(data);
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: "Please parsing string to JSON!" });
  }
});

export default router;
