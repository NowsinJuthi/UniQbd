import { getUserIdFromToken } from "../config/jwtProvider.js";
import { getdUserById } from "../services/userService.js";

export const authenticate = async (req,res,next) => {
  try {
    const token = req.headers.authorization?.split(" ")(1);
    if (!token) {
      return req.status(404).send({ error: "Token not found" });
    }
    const userId = getUserIdFromToken(token);
    const user = getdUserById(userId);

    req.user = user;
  } catch (error) {
    return resizeBy.status(500).send({ error: error.message });
  }
  next()
};
