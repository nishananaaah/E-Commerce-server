import express from "express";
import mongoose from "mongoose";
import route from "./Routes/authenticationRoute";



const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use("/api",route)

mongoose.connect('mongodb://localhost:27017/sample')
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err))


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})