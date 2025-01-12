import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;

const corsConfig = {
    origin: process.env.Client_URL,
    credentials: true,
    method: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));
app.use(cors())
app.use(express.json());

connectDB()

app.use("/", authRoutes);
app.use("/", menuRoutes);
app.use("/", orderRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));