import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { setCloudinary } from "./config/cloudinary.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
setCloudinary();

app.use("/projects", projectsRoutes);
app.use("/contact", contactRoutes);

export default app;
