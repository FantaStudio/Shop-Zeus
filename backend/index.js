const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const productsRoutes = require(`./routes/products`);
const authRoutes = require(`./routes/auth`);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(productsRoutes);
app.use(authRoutes);

/*  */

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://kolilia:jwm4321@cluster0.7pdz3.mongodb.net/zeus-shop?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => {
      console.log(`Server has been started`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
