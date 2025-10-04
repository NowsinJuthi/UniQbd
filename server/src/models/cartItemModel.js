import mongoose, { mongo } from "mongoose";

const model = new mongoose.Schema({
    cart:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required: true,
    },
    product:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"products",
        required: true,
    },
    quantity:{
        type:  Number,
        required: true,
        default: 1
    },
    price:{
        type:  Number,
        required: true,
    },
    discountPrice:{
        type:  Number,
        required: true,
    },
    userId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
})

const CartItemModel = mongoose.model('cartItems', model)

export default CartItemModel