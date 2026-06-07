import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Multi Store Order Management Backend is Running 🚀");
});

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
  });
}