import userModel from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(403).send({ error: "Access denied. Admins only." });
    } 
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};




