import { usertocken } from "../middelwares/authMiddleware.js";
import exprss from 'express'
import { viewproduct,productById,productBycategory,orderbyid } from "../Controllers/productcantrolls.js";
import TryCatchMiddleware from "../middelwares/TryCatchMiddleware.js";
import { addToCart,viewCart,incrementCartItemqunity,decrementCartItemquntity } from "../Controllers/cartController.js";
import { addAndRemoveWishlist,viewWishlist,removeWishlist } from "../Controllers/wishlistControlls.js";
import {payment,verifyPayment} from '../Controllers/paymentController.js'

const route=exprss.Router()

//products

route.use(usertocken)
route.get('/products',TryCatchMiddleware(viewproduct))

route.get('/products/:id',TryCatchMiddleware(productById))
route.get('/products/category/:categoryname',TryCatchMiddleware(productBycategory))

//cart route
route.get('/:id/cart',TryCatchMiddleware(viewCart))
route.post('/:userId/cart/:productId',TryCatchMiddleware(addToCart))
route.patch('/:userId/cart/:id/increment',TryCatchMiddleware(incrementCartItemqunity))
route.put('/:userId/cart/:id/decrement',TryCatchMiddleware(decrementCartItemquntity))
route.delete('/:userId/cart/:productId/remove',TryCatchMiddleware(RemoveCart))

//wishlist route 

route.post('/:userId/wishlist/:productId',TryCatchMiddleware(addAndRemoveWishlist))
route.get('/:id/wishlist',TryCatchMiddleware(viewWishlist))
route.delete('/:userId/wishlist/:productId/remove',TryCatchMiddleware(removeWishlist))

//payment route
route.post('/payment/:id',TryCatchMiddleware(payment))
route.post('/verifypayment',TryCatchMiddleware(verifyPayment))
route.get('/:userId/orders',TryCatchMiddleware(orderbyid))

export default route