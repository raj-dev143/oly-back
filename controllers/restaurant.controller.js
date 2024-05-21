const Restaurant = require("../models/Restaurant.model");

exports.getStoredCoupon = async (req, res) => {
  try {
    const storedCoupon = await Restaurant.findOne().sort({ createdAt: -1 });
    if (!storedCoupon) {
      return res.status(404).json({ error: "No coupon data found" });
    }
    res.status(200).json(storedCoupon);
  } catch (error) {
    console.error("Failed to fetch stored coupon:", error.message);
    res.status(500).json({ error: "Failed to fetch stored coupon" });
  }
};
