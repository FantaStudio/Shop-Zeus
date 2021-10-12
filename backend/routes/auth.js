const Router = require("express");
const controller = require("../controllers/auth");
const { check } = require("express-validator");
const router = new Router();

const authMiddleware = require("../middleware/auth");

const roleMiddleware = require("../middleware/role");

const regularForUppercase = new RegExp("(?=.*?[A-Z])");

const regularForLowerCase = new RegExp("(?=.*?[a-z])");

const regularForOneNumber = new RegExp("(?=.*?[0-9])");

const lengthOfPassword = 8;

router.post(
  "/api/v1/auth/register",
  [
    check("name", "Имя пользователя обязательное").notEmpty(),
    check("email", "Почта пользователя обязательна").notEmpty(),
    check("email", "Почта введена неправильно").isEmail(),
    check("phone", "Телефон пользователя обязателен").notEmpty(),
    check("phone", "Телефон пользователя введен неправильно").isMobilePhone(),
    check("password", "Пароль пользователя обязателен").notEmpty(),
    check(
      "password",
      "Пароль пользователя должен содержать хотя бы одну заглавную букву"
    ).matches(regularForUppercase),
    check(
      "password",
      "Пароль пользователя должен содержать хотя бы одну маленькую букву"
    ).matches(regularForLowerCase),
    check(
      "password",
      "Пароль пользователя должен содержать хотя бы одну цифру"
    ).matches(regularForOneNumber),
    check(
      "password",
      "Пароль пользователя должен содержать минимум 8 символов"
    ).isLength({ min: lengthOfPassword }),
  ],
  controller.register
);

router.post("/api/v1/auth/login", controller.login);

router.get("/api/v1/auth/activate/:link", controller.activate);

router.get(
  "/api/v1/auth/users",
  roleMiddleware(["Admin"]),
  controller.fetchUsers
);

module.exports = router;
