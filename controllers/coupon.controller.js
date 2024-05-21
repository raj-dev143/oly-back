const Coupon = require("../models/Coupon.model");
const Restaurant = require("../models/Restaurant.model");

exports.createCoupon = async (req, res) => {
  const { fullName, email, memberUniqueId, couponCode } = req.body;

  try {
    const existingCoupon = await Coupon.findOne({ email });
    if (existingCoupon) {
      return res
        .status(400)
        .json({ error: "Coupon already generated for this member" });
    }

    const newCoupon = new Coupon({
      fullName,
      email,
      memberUniqueId,
      couponCode,
    });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.error("Failed to save coupon:", error.message);
    res.status(500).json({ error: "Failed to save coupon" });
  }
};

exports.getCouponByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const coupon = await Coupon.findOne({ email });
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.error("Failed to fetch coupon:", error.message);
    res.status(500).json({ error: "Failed to fetch coupon" });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.error("Failed to fetch coupons:", error.message);
    res.status(500).json({ error: "Failed to fetch coupons" });
  }
};

exports.verifyAndStoreCoupon = async (req, res) => {
  const { couponCode } = req.params;

  try {
    const coupon = await Coupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    const usedCoupon = await Restaurant.findOne({ couponCode });
    if (usedCoupon) {
      return res
        .status(400)
        .json({ error: "Coupon code has already been used" });
    }

    const appliedDate = new Date();
    const newRestaurantEntry = new Restaurant({
      fullName: coupon.fullName,
      email: coupon.email,
      memberUniqueId: coupon.memberUniqueId,
      couponCode: coupon.couponCode,
      appliedDate: appliedDate,
    });
    await newRestaurantEntry.save();

    res.status(200).json({ ...coupon._doc, appliedDate });
  } catch (error) {
    console.error("Failed to verify coupon and store data:", error.message);
    res.status(500).json({ error: "Failed to verify coupon and store data" });
  }
};

exports.getCouponByCode = async (req, res) => {
  const { couponCode } = req.params;

  try {
    const coupon = await Coupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.error("Failed to fetch coupon:", error.message);
    res.status(500).json({ error: "Failed to fetch coupon" });
  }
};
