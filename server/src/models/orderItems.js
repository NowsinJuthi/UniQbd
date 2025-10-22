import mongoose, { Types } from "mongoose";

const model = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
        required: true
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discountedPrice:{
        type: Number,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
     
})

const OrderItem = mongoose.model('orderItems', model)
export default OrderItem