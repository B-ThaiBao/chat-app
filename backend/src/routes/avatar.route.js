import express from "express";
import { updateAvatar } from "../controllers/avatar.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/update-avatar", protectRoute, updateAvatar);

export default router;
