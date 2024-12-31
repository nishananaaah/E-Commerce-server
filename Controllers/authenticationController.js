import User from '../Models/userModel.js'
import userAuthjoi from '../Validation/userauthjoi.js'
import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'


//register section
export const register=async (req,res,next)=>{
    const {value,error} = userAuthjoi.validate(req.body);
    if(error){
        return res.status(400).json({message:'found validation error'})
    }
 const {username,email,password}=value;
   
    try {
         const isExcistinguser = await User.findOne({email:email})

         if(isExcistinguser){
            return res.status(400).json({status: "error",message: "email already taken!"})
         }

         const hashedpassword = await bcryptjs.hash(password,10)//10 hash number generate security increase

         const newuser=new User({
            username:username,
            image:req.cloudinaryImageUrl,
            email:email,
           password:hashedpassword
         }) 

         await newuser.save()

         return res.status(201).json({ status: "success",message: "User registered successfully",
            data:newuser
          })
    
    }catch(error){
        res.status(500).json({messege:'internel server error'})
    }
}

//login session
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log('iiiii',email);
  
  try {
    const isUserValid = await User.findOne({ email });

    // console.log(password, email, "this login achieved");

    if (!isUserValid) {
      return res.status(404).json({ error: "User not found" });
    }
    if(isUserValid.isDeleted){
      return res.status(403).json({error:"User is blocked"})//admin block user
    }

    const validPass = bcryptjs.compareSync(password, isUserValid.password);
  
    if (!validPass) {
      return res.status(404).json({ error: "Wrong credentials" });
    }

    // JWT setting
    const token = jwt.sign({ id: isUserValid._id }, process.env.USER_JWT);
    const { password: hashedPassword, ...data } = isUserValid._doc;
    const expiryDate = new Date(Date.now() + 60 * 1000);

    // Cookie setting
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ message: "User logged in successfully", user: data, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
};
