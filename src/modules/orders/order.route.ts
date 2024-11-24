import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

// Order creation endpoint
router.post("/", orderController.createOrder);

// Revenue calculation endpoint
router.get("/revenue", orderController.calculateRevenue);

export const OrderRoutes = router;
