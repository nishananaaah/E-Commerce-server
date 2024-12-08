import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const usertocken=(req,res,next)=>{
    //This is accessing the authorization header from the headers object. HTTP headers are key-value pairs, and the authorization header usually contains authentication-related data like a Bearer token or other credentials
    try {        
        const authHeader = req.headers["authorization"];
        // const token = req.headers["authorization"];
        // console.log(authHeader,'tokennnnnn');
        


        if(!authHeader){
            return res.status(403).json({message:"Token not provided"})
        }



        const token = authHeader.split(" ")[1];
        // console.log(authHeader)
        

        if(!token){
            return res.status(403).json({message:'tocken not invalid'})
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
