import mongoose from "mongoose";


const wishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"Products",
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    }
});
const wishlist = new mongoose.model("Wishlist",wishlistSchema);
export default wishlist;