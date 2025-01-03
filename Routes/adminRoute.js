import { login,viewAllusers,adminviewUserbyid,adminBlockUserById,adminviewUserByUserName,adminUnblockUserById } from "../Controllers/adminController.js";
import express from "express";
import {adminTocken} from "../Middlewares/adminAuthMiddleware.js";
import TryCatchMiddleware from "../Middlewares/trycatchMiddleware.js";
import uploadImage from "../Middlewares/uploadMiddleware.js";
import { adminAddProduct,adminUpdateproduct,adminviewproduct,admindeleteproductbyid,adminviewproductbyid,adminproductbycategery    } from "../Controllers/adminProductController.js";
import { orderdetails,stats } from "../Controllers/adminorderDetails.js";

const router=express.Router()
//admin login 
router.post('/login',TryCatchMiddleware(login))

// router.use(adminTocken)
//admin route
router.get('/viewAllUsers',TryCatchMiddleware(viewAllusers))

router.get('/user/:id',TryCatchMiddleware(adminviewUserbyid))

router.get('/user/findname/:username',TryCatchMiddleware(adminviewUserByUserName))

router.put('/user/block/:userId',TryCatchMiddleware(adminBlockUserById))

router.put('/user/unblock/:userId',TryCatchMiddleware(adminUnblockUserById))

//admin product route

router.post('/createproducts',uploadImage,TryCatchMiddleware(adminAddProduct))

router.get('/products',TryCatchMiddleware(adminviewproduct))

router.get('/products/:productId',TryCatchMiddleware(adminviewproductbyid))

router.get('/products/category/:categoryname',TryCatchMiddleware(adminproductbycategery))

router.put('/products/edit/:productId',uploadImage,TryCatchMiddleware(adminUpdateproduct))

router.delete('/products/delete/:productId',TryCatchMiddleware(admindeleteproductbyid))



router.get('/orders',TryCatchMiddleware(orderdetails))

router.get('/stats',TryCatchMiddleware(stats))



export default router;