import JWT from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const adminTocken=async(req,res,next)=>{
    try {
        
        const tocken=req.headers["authorization"]

        if(!tocken){
            return res.status(404).json({messge:'admin tocken not provided'})
        }

        JWT.verify(tocken,process.env.ADMIN_SECRET_KEY,(error,decode)=>{
            if(error){
               return  res.status(401).json({messge:'Unauthorized'})
            }

            req.email=decode.email
            next()
        })

    } catch (error) {
      return  res.status(500).json({messge:'intrenel server error'})
       
    }
}