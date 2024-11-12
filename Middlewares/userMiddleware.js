import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const usertocken = (req,res,next)=>{
    try{
        const tocken = req.headers["authorization"];

        if(!tocken){
            return res.status(403).json({message:"Token not provided"});
        }
        jwt.verify(tocken,process.env.USER_JWT,(err,decode)=>{
            if(err){
                return res.status(401).json({message:"Unauthorized"});
            }
            req.email = decode.email;
            next();
            
        })
    }catch(error){
        res.status(500).json({message:"Server error"});
        next(error)
    }
};