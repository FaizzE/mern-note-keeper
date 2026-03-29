import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

connectDb();

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});

// mongodb+srv://faizulislam3540_db_user:vO0vLQxX4bnevy3h@cluster0.miypsym.mongodb.net/?appName=Cluster0
