const Order = require("../models/Order");


// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      address,
      phone,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      address,
      phone,
      paymentMethod,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// USER ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADMIN - GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADMIN - UPDATE STATUS
const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
};