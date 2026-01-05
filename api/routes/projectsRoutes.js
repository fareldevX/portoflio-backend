import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import Project from "../models/Project.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No image uploaded!" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "projects" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    const project = new Project({
      ...req.body,
      imageUrl: uploadResult.secure_url,
      tech_stack: JSON.parse(req.body.tech_stack),
    });
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: "Please parsing string to JSON!" });
  }
});

export default router;
