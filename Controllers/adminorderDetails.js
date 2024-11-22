
import orders from "../Models/orderModel.js"

export const orderdetails=async (req,res)=>{
  const orderss=await orders.find().populate({//.populate('userId'): Tells Mongoose to look at the userId field in the Post document and replace it with the actual User document that corresponds to that userId.
    path:'productId'
  })
  
  if(orderss.length===0){
    return res.status(404).json({messege:'orders not found'})
  }

  res.status(200).json(orderss)
}


export const stats=async (req,res)=>{

    const totalstats= await orders.aggregate([
      {
        $group:{
          _id:null,
          totalproducts:{$sum:1},
          totalrevenue:{$sum:"$totalPrice"}
        }
      }
    ]);

    if(totalstats.length>0){
      res.status(200).json({status:'success',data:totalstats})
    }else{
      res.status(200).json({
        status:'success',
        totalproducts:0,
        totalrevenue:0
      });
    }

    console.log({totalstats});
    
}