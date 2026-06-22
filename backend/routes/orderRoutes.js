const express = require("express");

const {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// USER

router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/myorders",
  authMiddleware,
  getOrders
);


// ADMIN

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

module.exports = router;