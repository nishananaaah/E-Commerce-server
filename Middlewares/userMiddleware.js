import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const usertocken=(req,res,next)=>{
    try {        
        const token = req.headers["authorization"];
//This is accessing the authorization header from the headers object. HTTP headers are key-value pairs, and the authorization header usually contains authentication-related data like a Bearer token or other credentials

    if(!token){
            return res.status(403).json({message:'tocken not provided'})
        }
    

        jwt.verify(token,process.env.USER_JWT,(err,decode)=>{
            if(err){
                res.status(401).json({message:'unauthorized'})
            }
           
            req.id = decode.id;
            
            next();
          })

    }catch (error) {
    res.status(500).json({ message: "Server error" });
    next(error);
    }
}
