import User from "../Models/userModel.js";
import Cart from '../Models/cartModel.js'
import products from "../Models/productModel.js";

export const addToCart = async (req,res)=>{
    const userId=req.params.userId;
    const productId=req.params.productId;

    //find user
   const user = await User.findById(userId)
   if(!user){
     return res.status(404).json({message:'user not found'})
   } 
   if(user.isDelted===true) return res.status(210).json({message:'Admin blocked'})
  //find product
   const product= await products.findById(productId)
   
   if(!product){
    return res.status(404).json({message:'product not found'})
   }

   //check product already add or not add

   let itmeCart = await  Cart.findOne({userId:user._id,productId:product._id})
   if(itmeCart) {
    itmeCart.quantity++;
    await itmeCart.save()
    return res.status(200).json({message:'Cart product increment quantity'})
   }else{
    itmeCart = await Cart.create({
        userId:user._id,
        productId:product._id,
        quantity:1
    })
    //add item in cart 
     user.cart.push(itmeCart._id)
     await user.save();
     return res.status(200).json({message:'product add to cart successfully'})
   }

}



  export const viewCart= async (req,res)=>{
    const {id} = req.params;
   
    const user= await User.findById(id)
    .populate({
      path:"cart",
      populate:{path:"productId"}
  })

    if(!user){
      return res.status(404).json({message:'user not found'})
    }

    if(!user.cart||user.cart.length===0){
      return res.status(200).json({message:'yout cart is empty',data:[]})
    }
    
    res.status(200).json(user.cart)

  }



export const incrementCartItemqunity= async (req,res)=>{
  // console.log('this is increment ',req.body);


  const userId=req.params.userId
  const productId=req.params.id
//user find
  const user=await User.findById(userId)
  if(!user){
    return res.status(404).json({message:'user not found'})
  }
  //produnt find


  const product=await products.findById(productId)
  
  if(!product){
    return res.status(209).json({error:'error',message:'product not found'})
  }
 //find or cart item
  
 const cartItem= await Cart.findOne({userId:user._id,productId:product._id});
 if(!cartItem){
    return res.status(260).json({status:"error",message:'cart item not found'})
 }

 cartItem.quantity++;
 await cartItem.save();

 return res.status(201).json({status:'ok',message:'quantity incremented'})
}




export const decrementCartItemquntity=async (req,res)=>{
  const userId=req.params.userId;
  const productId=req.params.id;
 
 
  //find user
  const user=await User.findById(userId)
  if(!user){
    return res.status(404).json({stats:'error',message:'user not found'})
  }
  //find product
  const product=await products.findById(productId)
  if(!product){
    return res.status(404).json({status:'error',message:'product not found'})
  }

  //find cart or create
const cartItem=await Cart.findOne({userId:user._id,productId:product._id})

  if(!cartItem){
    return res.status(260).json({message:'cart item not found'})
  }

  if(cartItem.quantity>1){
    cartItem.quantity--;
    await cartItem.save()

    return res.status(201).json({status:'ok',message:'quntity decremented'})
  }
} 

//remove cart 
export const RemoveCart= async (req,res)=>{
  const {userId,productId}=req.params;
  
 const user=await User.findById(userId)
 if(!user){
  return res.status(404).json({message:'user not found'})
 }

 const product=await products.findById(productId)
 if(!product){
  return res.status(404).json({message:'product not found'})
 }
 
const cartItem= await Cart.findOneAndDelete({userId:user._id,productId:product._id})


 if(!cartItem){
  return res.status(404).json({message:'product not found on user cart'})
 }

 // find thd index of the cartitme in the users cartitems array 
 
 const cartItemIndex = user.cart.findIndex(item => item && item.equals(cartItem._id));
  if (cartItemIndex !== -1) {
    user.cart.splice(cartItemIndex, 1);
    await user.save();
    
  }

 return res.status(200).json({message:'product removed successfully'});
}