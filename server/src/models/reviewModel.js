import mongoose, { mongo } from "mongoose";

const model = new mongoose.Schema({
    review:{
        type: String,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const ReviewModel = mongoose.model('reviews', model)

export default ReviewModel