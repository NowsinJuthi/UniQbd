import { getUserIdFromToken } from "../config/jwtProvider.js";
import { getUserById } from "../services/userService.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not found" });
    }

    // ✅ get user ID from token
    const userId = getUserIdFromToken(token);
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next(); // ✅ শুধু একবার কল করো
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
