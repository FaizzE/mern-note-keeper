import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log("We just got a new req");
//   next();
// })

app.use("/api/notes", notesRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
});
