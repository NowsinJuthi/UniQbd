import slugify from "slugify";
import orderNoteSelectModel from "../models/orderNoteSelectModel.js";


export const createNoteController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingNote = await orderNoteSelectModel
    .findOne({ name });
    if (existingNote) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
        category: existingNote,
      });
    }
    console.log("Saving note:", name);

    const Note = await new orderNoteSelectModel({
      name,
      slug: slugify(name),
    }).save();
    console.log("Saved note:", Note);

    res.status(201).send({
      success: true,
      message: "New Note created",
      note: Note,
    });
  } catch (error) {
    console.log("CreateNote Error:", error);
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

export const noteController = async (req, res) => {
  try {
    const notes = await orderNoteSelectModel.find({});
    res.status(200).send({
      success: true,
      message: "All Notes List",
      notes,
    });
  } catch (error) {
    console.log("GetNotes Error:", error);
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

export const updateNoteController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const note = await orderNoteSelectModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

export const simpleNoteController = async (req, res) => {
  try {
    const note = await orderNoteSelectModel.findOne({ slug: req.params.slug });
    res
      .status(200)
      .send({ success: true, message: "Note Details", note });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

export const deleteNoteController = async (req, res) => {
  try {
    const { id } = req.params;
    await orderNoteSelectModel.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};
