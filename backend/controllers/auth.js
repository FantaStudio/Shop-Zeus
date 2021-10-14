require("dotenv").config();

const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const mailService = require("../service/mail");

const { secret } = require("../config");

const { validationResult } = require("express-validator");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "48h" });
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

      const activationLink = uuid.v4();

      const clientRole = await Role.findOne({ value: "Client" });

      const user = new User({
        name,
        email,
        phone,
        password: hashPassword,
        activationLink,
        roles: [clientRole.value],
      });

      await mailService.sendActivationEmail(
        email,
        `${process.env.API_URL}/api/v1/auth/activate/${activationLink}`
      );

      await user.save();

      return res.json({
        message: "Пользователь успешно авторизован",
        description: "",
      });
    } catch (err) {
      console.log(err);

      return res
        .status(400)
        .json({ message: "Регистрация не удалась", description: "" });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Авторизация не удалась",
          description: errors?.errors[0]?.msg,
        });
      }

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

      if (!user?.isActivated) {
        return res.status(400).json({
          message: "Авторизация не удалась",
          description: `Ваша почта еще не подтверждена`,
        });
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.status(200).json({
        token,
        email: user?.email,
        name: user?.name,
        phone: user?.phone,
        roles: user?.roles,
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Авторизация не удалась", description: "" });
    }
  }

  async activate(req, res) {
    try {
      const activationLink = req.params.link;

      const user = await User.findOne({ activationLink });

      if (!user) {
        return res.status(400).json({
          message: "Такого пользователя не существует",
          description: "",
        });
      }

      user.isActivated = true;

      await user.save();

      return res.redirect(`${process.env.CLIENT_URL}/login?confirmEmail=true`);
    } catch (err) {
      return res.status(400).json({
        message: "Подтверждения почты не удалось",
        description: "",
      });
    }
  }

  async fetchProfile(req, res) {
    try {
      const user = await User.findOne({ _id: req?.user?.id });

      return res.status(200).json({
        email: user?.email,
        name: user?.name,
        phone: user?.phone,
        roles: user?.roles,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "",
      });
    }
  }
}

module.exports = new auth();
