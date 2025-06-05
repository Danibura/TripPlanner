import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import tripRoutes from "./routes/trip.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.MONGO_URL);

app.use(express.json());

app.use("/api/trips", tripRoutes);
app.use("/api/users", userRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started at http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
