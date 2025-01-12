import express from "express";
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/menu", getMenu);
router.post("/menu", authenticateJWT, addMenuItem);
router.put("/menu/:id", authenticateJWT, updateMenuItem);
router.delete("/menu/:id", authenticateJWT, deleteMenuItem);

export default router;