import express from "express"
import cors from "cors";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postRoutes.js";
const port=3000;
const app=express();
connectDB();
app.use(cors())
app.use(express.json());
app.use("/api",authRoutes);
app.use("/api",postRoutes)
app.listen(port,()=>
{
    console.log(`The server is running on port ${port}`);
})