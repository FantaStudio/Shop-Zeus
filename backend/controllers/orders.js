const Order = require("../models/Order");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");

class orders {
  async createOrder(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Регистрация не удалась",
          description: errors?.errors[0]?.msg,
        });
      }

      const { address, city, postalCode, productsIds } = req.body;

      const findProducts = await Product.find({
        productsIds: { $in: productsIds },
      });

      if (!findProducts) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Такой продукт не найден",
        });
      }

      const order = new Order({
        address,
        city,
        postalCode,
        productsIds,
        userId: req?.user?.id,
      });

      await order.save();

      return res.status(200).json(order);
    } catch (err) {
      console.log(err);

      return res
        .status(400)
        .json({ message: "Создание заказа не удалось", description: "" });
    }
  }

  async fetchOrders(req, res) {
    try {
      const myOrders = await Order.find({ userId: req?.user?.id });

      let arr = [];

      for (const order of myOrders) {
        const products = await Product.find({
          _id: { $in: order?.productsIds },
        });

        const shortProducts = products.map((item) => {
          return {
            productId: item._id,
            name: item.name,
            imageHref: item.imageHref,
            price: item.price,
          };
        });

        arr = [
          ...arr,
          {
            orderId: order._id,
            products: shortProducts,
            execute: order.execute,
          },
        ];
      }

      return res.status(200).json(arr);
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: "Получение списка заказов не удалось",
        description: "",
      });
    }
  }
}

module.exports = new orders();
