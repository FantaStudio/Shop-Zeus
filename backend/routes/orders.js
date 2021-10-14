const Router = require("express");
const controller = require("../controllers/orders");
const { check } = require("express-validator");
const router = new Router();

const authMiddleware = require("../middleware/auth");

router.post(
  "/api/v1/orders/create",
  [
    authMiddleware,
    check("email", "Почта пользователя обязательна").notEmpty(),
    check("email", "Почта введена неправильно").isEmail(),
    check("password", "Пароль пользователя обязателен").notEmpty(),
  ],
  controller.createOrder
);

router.get("/api/v1/orders", authMiddleware, controller.fetchOrders);

module.exports = router;
