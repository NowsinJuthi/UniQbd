import mongoose, { mongo } from "mongoose";

const model = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    mobie:{
        type: Number,
        required: true
    },
})

const AddressModel = mongoose.model("address", model)

export default AddressModel