const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { secret } = require("../config");

const { validationResult } = require("express-validator");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class auth {
  async register(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Регистрация не удалась",
          description: errors?.errors[0]?.msg,
        });
      }

      const { name, email, phone, password } = req.body;

      const candidateEmail = await User.findOne({ email });

      if (candidateEmail) {
        return res.status(400).json({
          message: "Регистрация не удалась",
          description: "Пользователь с такой почтой уже существует",
        });
      }

      const candidatePhone = await User.findOne({ phone });

      if (candidatePhone) {
        return res.status(400).json({
          message: "Регистрация не удалась",
          description: "Пользователь с таким телефоном уже существует",
        });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const clientRole = await Role.findOne({ value: "Client" });

      const user = new User({
        name,
        email,
        phone,
        password: hashPassword,
        roles: [clientRole.value],
      });

      await user.save();

      return res.json({
        message: "Пользователь успешно авторизован",
        description: "",
      });
    } catch (err) {
      console.log(err);

      res
        .status(400)
        .json({ message: "Регистрация не удалась", description: "" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req?.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "Авторизация не удалась",
          description: `Почта или пароль введены неправильно`,
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          message: "Авторизация не удалась",
          description: `Почта или пароль введены неправильно`,
        });
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.json({ token });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Авторизация не удалась", description: "" });
    }
  }

  async fetchUsers(req, res) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {}
  }
}

module.exports = new auth();
