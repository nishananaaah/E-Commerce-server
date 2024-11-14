import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const usertocken=(req,res,next)=>{
    try {
        const token = req.headers["authorization"];

     if(!token){
            return res.status(403).json({message:'tocken not provided'})
        }
        jwt.verify(token,process.env.USER_JWT,(err,decode)=>{
            if(err){
                res.status(401).json({message:'unauthorized'})
            }
           
            req.email = decode.email;
            next();
          })
    }catch (error) {
    res.status(500).json({ message: "Server error" });
    next(error);
    }
}
