require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const json2csv = require("json2csv");
const { Parser } = require("json2csv");

const productsRoutes = require(`./routes/products`);
const authRoutes = require(`./routes/auth`);
const adminRoutes = require(`./routes/admin`);
const ordersRoutes = require(`./routes/orders`);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, PATCH");
  res.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  const myCars = [
    {
      car: "Audi",
      price: 40000,
      color: "blue",
    },
    {
      car: "BMW",
      price: 35000,
      color: "black",
    },
    {
      car: "Porsche",
      price: 60000,
      color: "green",
    },
  ];

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(myCars);

  res.send(Buffer.from(csv));

  console.log(csv);
});

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(productsRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(ordersRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Server has been started`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

/* {
    "name": "Вася Пупкин",
    "email": "10iun20002@gmail.com",
    "phone": "+79880622961",
    "password": "Qwerty1234"
} */

/* {
    "name": "Админ",
    "email": "admin@zeus.com",
    "phone": "+79885642341",
    "password": "AminZeus21*"
} */
