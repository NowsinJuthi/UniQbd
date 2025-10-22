import userModel from "../models/userModel.js";
import { getAllUser, getUserProfileByToken } from "../services/userService.js";
import bcrypt from "bcrypt";

export const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];

    if (!jwt) {
      return res.status(404).send({ error: "token not found" });
    }
    const user = await getUserProfileByToken(jwt);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUser();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res
        .status(400)
        .send({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res
      .status(200)
      .send({ message: "Profile Updated Successfully", updatedUser });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
