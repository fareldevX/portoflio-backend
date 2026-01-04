import express from "express";
import cors from "cors";
import { upload } from "./utils/upload.js";
import { connectDB } from "./utils/connectDB.js";
import Photo from "./models/Photo.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.post("/upload", upload.single("image"), async (req, res) => {
  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

  const photo = new Photo({
    name: req.body.name,
    imageUrl: imageUrl,
  });
  await photo.save();

  res.status(201).json(photo);
});

app.use("/uploads", express.static("uploads"));
app.use("/projects", projectsRoutes);
app.use("/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running || http://localhost:${PORT}/projects`);
});
