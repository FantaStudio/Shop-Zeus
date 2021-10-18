const Router = require("express");
const controller = require("../controllers/orders");
const { check } = require("express-validator");
const router = new Router();

const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");

router.post(
  "/api/v1/orders",
  [
    check("address", "Адрес обязательное поле").notEmpty(),
    check("city", "Город обязательное поле").notEmpty(),
    check("postalCode", "Почтовый индекс обязательное поле").notEmpty(),
    check("productsIds", "Не указан какой продукт заказывается").notEmpty(),
    authMiddleware,
  ],
  controller.createOrder
);

router.get("/api/v1/orders", authMiddleware, controller.fetchOrders);

router.get(
  "/api/v1/admin/orders",
  roleMiddleware(["Admin"]),
  controller.fetchOrdersByAdmin
);

module.exports = router;
