require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const uuid = require("uuid");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const hex = uuid.v4();

    cb(null, Date.now() + hex + path?.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

const productsRoutes = require(`./routes/products`);
const authRoutes = require(`./routes/auth`);
const adminRoutes = require(`./routes/admin`);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
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

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file?.filename);

  res.json({});
});

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
