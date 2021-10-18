const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { Parser } = require("json2csv");

const myCustomLabels = {
  totalDocs: "total",
  docs: "data",
  limit: "perPage",
  page: "page",
  totalPages: "pages",
};
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

  async fetchOrdersByAdmin(req, res) {
    try {
      const { page, perPage, search } = req.query;

      let params = {};

      if (search) {
        params = {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        };
      }

      await Order.paginate(
        params,
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: myCustomLabels,
        },
        async function (err, result) {
          let arrForFront = [];

          for (const order of result?.data) {
            const findUser = await User.findById(order?.userId);

            const products = await Product.find({
              _id: { $in: order?.productsIds },
            });

            const shortProducts = products.map((item) => {
              return {
                productId: item._id,
                name: `${item?.manufacturer} ${item?.model}`,
              };
            });

            arrForFront = [
              ...arrForFront,
              {
                orderId: order._id,
                products: shortProducts,
                execute: order.execute,
                clientName: findUser?.name,
                address: order?.address,
                city: order?.city,
                postalCode: order?.postalCode,
              },
            ];
          }

          return res.status(200).json({
            ...result,
            data: arrForFront,
          });
        }
      );
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: "Получение списка заказов не удалось",
        description: "",
      });
    }
  }

  async fetchOrdersByAdminCsv(req, res) {
    try {
      const { page, perPage } = req.query;

      await Order.paginate(
        {},
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: myCustomLabels,
        },
        async function (err, result) {
          let arrForFront = [];

          for (const order of result?.data) {
            const findUser = await User.findById(order?.userId);

            const products = await Product.find({
              _id: { $in: order?.productsIds },
            });

            const shortProducts = products.map((item) => {
              return `${item?.manufacturer} ${item?.model}`;
            });

            arrForFront = [
              ...arrForFront,
              {
                products: shortProducts.join(", "),
                execute: order.execute ? "Доставлен" : "Не доставлен",
                clientName: findUser?.name,
                address: order?.address,
                city: order?.city,
                postalCode: order?.postalCode,
              },
            ];
          }

          const fields = [
            {
              label: "Продукты",
              value: "products",
            },
            {
              label: "Состояние",
              value: "execute",
            },
            {
              label: "Клиент",
              value: "clientName",
            },
            {
              label: "Адрес",
              value: "address",
            },
            {
              label: "Адрес",
              value: "address",
            },
            {
              label: "Город",
              value: "city",
            },
            {
              label: "Почтовый индекс",
              value: "postalCode",
            },
          ];

          const json2csvParser = new Parser({ fields: fields, withBOM: true });
          const csv = json2csvParser.parse(arrForFront);

          res.header("Content-type", "text/csv; charset=utf-8");
          res.status(200).send(csv);
        }
      );
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
