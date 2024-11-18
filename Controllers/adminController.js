import { config } from "dotenv";
import jwt from "jsonwebtoken";
import User from "../Models/usermodel";

config();

export const login = async (req,res,next)=>{
    const {email,password} = req.body;
}

if(email === process.env.ADMIN_EMAIL&&password ===process.env.ADMIN_PASSWORD)