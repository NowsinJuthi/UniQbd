import mongoose from 'mongoose'

const model = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    }],
    payInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "payInfo"
    }],
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }],
    rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    createAt: [{
        type: Date,
        default: Date.now()
    }],
    role: {
        type: Number,
        required: true,
        default: 0,
    },
    // answer:{
    //     type: String,
    //     required: true,
    // }
},{timestamps: true})


const userModel = mongoose.model("users", model)

export default userModel;