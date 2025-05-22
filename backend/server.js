import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import tripRoutes from "./routes/trip.route.js";

dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;

console.log(process.env.MONGO_URI);

app.use(express.json());

app.use("./api/trips", tripRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});

