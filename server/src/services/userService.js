import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { getUserIdFromToken } from "../config/jwtProvider.js";

export const createUser = async (userData) => {
  try {
    let { name, email, password } = userData;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      throw new Error(`User already exists with email: ${email}`);
    }

    password = await bcrypt.hash(password, 8);

    const user = await userModel.create({
      name,
      email,
      password,
    });

    return user; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getdUserById = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error(`User not found with this id: ${userId}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error(`User not found with this email: ${email}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserProfileByToken = async (token) => {
  try {
    const userId = getUserIdFromToken(token);
    const user = await getdUserById(userId);
    if (!user) {
      throw new Error(`User not found with this id: ${userId}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUser = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
