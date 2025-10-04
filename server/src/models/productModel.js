import mongoose from 'mongoose'

const model = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
    },
    discountPersent: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true
    },
    package: {
        name: {
            type: String
        },
        quantity:{
            type: String
        }
    },
    imgUrl: {
        type: String
    },
    rating: [
        {
            type: mongoose. Schema.Types.ObjectId,
            ref:"ratings"
        }
    ],
    reviews: [
        {
            type: mongoose. Schema.Types.ObjectId,
            ref:"reviews"
        }
    ],
    numRatings:{
        type: Number,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const ProductModel = mongoose.model('products', model)
export default ProductModel