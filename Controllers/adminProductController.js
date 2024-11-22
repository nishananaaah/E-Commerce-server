import productjoi from '../Validation/productjoi.js'
import products from '../Models/productModel.js'
import express from "express"
const app=express()
app.use(express.json())

export const adminAddProduct=async(req,res,next)=>{
   const result = await productjoi.validateAsync(req.body);//validateAsync is used for asynchronous validation in the Joi validation library.
   if(!result){
    return res.status(403).json({message:"validation error on add product"})
   }

   const newProdut=new products({
    title:result.title,
    description:result.description,
    price:result.price,
    category:result.category,
    image:req.cloudinaryImageUrl
   });

   await newProdut.save()
   return res.status(200).json({message:'product added successfully'})
}




export const adminviewproduct=async (req,res,next)=>{
   
    const allproduct=await products.find()
 
    if(!allproduct){
        return res.status(404).json({message:'produts not founded '})
    }

    res.status(200).json(allproduct)
   
}




export const adminviewproductbyid=async(req,res)=>{
    const {productId}=req.params;

    const product=await products.findById(productId)

    if(!product){
        return res.status(404).json({message:'produnt not found'})
    }

    return res.status(200).json(product)
}



export const adminproductbycategery=async (req,res)=>{
    const {categoryname}=req.params

    const product=await products.find({
        $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    }).select('title category price');

    if(product.length===0){
        return res.status(404).json({message:'No items found in the given category'})
    }

    res.status(200).json({product})
}




export const adminUpdateproduct=async(req,res)=>{
    const {productId}=req.params

    const product= await products.findById(productId)

    if(!product){
        return res.status(404).json({message:'product not found'})
    }

    const {title,description,price,category}=req.body;

    if(title)product.title=title;

    if(description)product.description=description;

    if(price)product.price=price;

    if(req.cloudinaryImageUrl)product.image=req.cloudinaryImageUrl

    if(category)product.category=category;

    await product.save()

    res.status(200).json({message:'product successfully updated'})

}

export const admindeleteproductbyid=async (req,res)=>{
    const {productId}=req.params

    const produtdelete= await products.findByIdAndDelete(productId)

    if(!produtdelete){
        return res.status(404).json({message:'product not found'})
    }

    res.status(200).json({message:'product deleted successfully'})
}