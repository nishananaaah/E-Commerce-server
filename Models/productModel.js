import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
  },
  quantity:{
    type:Number,
    default:1,
  },
  isDeleted:{
    type:Boolean,
    default:false,
  },
});

const Products =  mongoose.model('products',productSchema);
export default Products;