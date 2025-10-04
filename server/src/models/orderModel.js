import mongoose, { mongo } from "mongoose";

const model = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems"
    }],
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date
    },
    paymentDetails: {
        payMethod: {
            type: String
        },
        transactionId: {
            type: String
        },
        payId: {
            type: String
        },
        payStatus: {
            type: String,
            default: "Pending"
        }
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalDiscountedPrice: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    totalItem: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const OrderModel =  mongoose.model('orders', model)

export default OrderModel
