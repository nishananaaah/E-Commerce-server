import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const usertocken=(req,res,next)=>{
    try {
        const tocken=req.headers["authorization"];

        
        if(!tocken){
            return res.status(403).json({message:'tocken not provided'})
        }
        jwt.verify(tocken,process.env.JWT_SECRET,(error,decode)=>{
            if(error){
                res.status(401).json({message:'unauthorized'})
            }
           
            req.email=decode.email;
        
            next();

        })
    } catch (error) {
    res.status(500).json({ message: "Server error" });
    next(error);
    }
}