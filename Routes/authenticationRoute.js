import express from "express";
import { register,login } from "../Controllers/authenticationController.js";
import uploadImage from "../Middlewares/uploadMiddleware.js";


const route  = express.Router();

route.post("/register",uploadImage,register);
route.post("/login",login);

export default route;