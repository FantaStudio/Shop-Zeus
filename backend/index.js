require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

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
