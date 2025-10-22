import mongoose, { mongo } from "mongoose";

const model = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  slug: {
    type: String,
    lowercase: true,
  },

});

const orderNoteSelectModel = mongoose.model("Note", model);

export default orderNoteSelectModel;
