
import product from '../Models/productModel.js';
import User from '../Models/userModel.js';

export const viewproduct=async (req,res)=>{
    
        const produt=await product.find()

        if(!produt){
            return res.status(404).json({message:'unable to get products'})
        }

        res.status(200).json({status:"success",message:'successfully fetched data',data:produt})
}

export const productById=async(req,res)=>{
    const productId = req.params.id;
    const product= await product.findById(productId)
    if(!product){
        return res.status(404).json({Error:'not found',message:'product not found'})
    }
    res.status(200).json({product})
}

export const productBycategory = async (req,res)=>{
    const {categoryname}=req.params
    const product=await product.find({
        $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    }).select('title category price')

    if(!product){
        return res.status(404).json({message:'item not found'})
    }

    return res.status(200).json({product})
}

export const orderbyid=async (req,res)=>{
  const {userId}=req.params;

  const user = await User.findById(userId).populate({
    path: "orders",         // Populate the orders array
    populate: {path: "productId"},
  });
//  populate:{path:"productId"}
  if(!user){
    return res.status(404).json({message:'user not found'})
  }
  
  if(!user.orders||user.orders.length===0){
    return res.status(200).json({message:'no orders yet ',data:[]})
  }

  return res.status(200).json(user.orders)

}