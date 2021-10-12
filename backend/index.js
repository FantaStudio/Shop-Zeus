require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const productsRoutes = require(`./routes/products`);
const authRoutes = require(`./routes/auth`);
const adminRoutes = require(`./routes/admin`);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(productsRoutes);
app.use(authRoutes);
app.use(adminRoutes);

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
