import express from "express";
import mongoose from "mongoose";
import authRoutes from "./Routes/productRoute.js";
import dotenv from "dotenv";
import productRoute from "./Routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

//fix for ES module _dirname
const _filename=fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.use(cors());

app.use(express.json())

app.use("/api/users",authRoutes)
app.use("/api/users",productRoute)

mongoose.connect('mongodb://localhost:27017/sample')
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err))


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})