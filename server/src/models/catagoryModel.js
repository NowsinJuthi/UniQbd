import mongoose, { mongo } from "mongoose";

const model = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50,
    },
     parentCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    level:{
        type: Number,
        required: true,
    },
})

const CategoryModel = mongoose.model('categories', model)

export default CategoryModel;