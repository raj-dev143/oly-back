const express = require("express");
const router = express.Router();
const couponController = require("../controllers/coupon.controller");

router.post("/", couponController.createCoupon);
router.get("/", couponController.getCoupons);
router.get("/:email", couponController.getCouponByEmail);
router.get("/code/:couponCode", couponController.getCouponByCode);
router.post("/verify/:couponCode", couponController.verifyAndStoreCoupon); // New route

module.exports = router;
