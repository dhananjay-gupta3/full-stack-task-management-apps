import express from "express";
import { placeOrder, getOrders } from "../controllers/orderController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/order", authenticateJWT, placeOrder);
router.get("/orders", authenticateJWT, getOrders);

export default router;