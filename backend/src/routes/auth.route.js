import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  getUserProfile,
  updateUserProfile,
  deleteAccount,
  getAllUsers,
  searchUsers,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));
router.get("/profile", protectRoute, getUserProfile);
router.get("/users/search", protectRoute, searchUsers);
router.get("/users", protectRoute, getAllUsers);

router.put("/update-profile", protectRoute, updateProfile);
router.put("/profile", protectRoute, updateUserProfile);
router.delete("/account", protectRoute, deleteAccount);

export default router;
