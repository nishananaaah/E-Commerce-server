import product from "../Models/productModel.js";
import wishlist from "../Models/wishlistModel.js";
import User from "../Models/userModel.js";
import product from "../Models/productModel.js";
import product from "../Models/productModel.js";

export const addAndRemoveWishlist=async (req,res)=>{
    const userId=req.params.userId
    const productId=req.params.productId

    const user = await User.findById(userId)

    if(!user){
        return res.status(404).json({message:'user not fond'})
    }

    const product = await product.findById(productId)

   if(!product){
    return res.status(404).json({message:'product not found'})
   }

   let wishlistitem = await wishlist.findOne({userId:user._id, productId:product._id})
   
   if(wishlistitem){
    // return res.status(200).json({messege:'product already exist in wishlist'})

    const wishlistIndex=  user.wishlist.findIndex(item => item.equals(wishlistitem._id))

    if(wishlistIndex !==-1){
       user.wishlist.splice(wishlistIndex,1)
       await user.save()
    }

    return res.status(200).json({message:'product removed from wishlist successfully'})


    //-------------------------------------------------
   }

   wishlistitem = await wishlist.create({
    userId:user._id,
    productId:product._id,
    quantity:1
   })

   user.wishlist.push(wishlistitem._id)
   await user.save()

   return res.status(200).json({message:'product added to wishlist successfully'})
}

export const viewWishlist= async (req,res)=>{
    const {id}=req.params;

    const user = await User.findById(id).populate({
        path:'wishlist',
        populate:{path:'productId'}
    })
    
    if(!user){
        return res.status(404).json({message:'user not found'})
    }

    if(!user.wishlist|| user.wishlist.length===0){
        return res.status(200).json({message:'your wishlist is empty ',data:[]})
    }

    return res.status(200).json(user.wishlist)
}

export const removeWishlist= async (req,res)=>{
    const {userId,productId}=req.params

    const user = await User.findById(userId)

    if(!user){
        return res.status(4040).json({message:'user not found'})
    }

    const product = await product.findById(productId)

    if(!product){
        return res.status(404).json({message:'product not found'})
    }

    const wishlistitem = await wishlist.findOneAndDelete({userId:user._id, productId:product._id})

    if(!wishlistitem){
       return res.status(404).json({message:"product not found in the user's wishlist "})
    }

     // Find the index of the wishlist item in the user's wishlist array

     const wishlistIndex= user.wishlist.findIndex(item => item.equals(wishlistitem._id))

     if(wishlistIndex !==-1){
        user.wishlist.splice(wishlistIndex,1)
        await user.save()
     }

     return res.status(200).json({message:'product removed from wishlist successfully'})
}