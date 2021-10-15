const { Router } = require(`express`);
const router = Router();
const controller = require("../controllers/products");
const roleMiddleware = require("../middleware/role");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

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

    cb(null, Date.now() + hex + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get(
  `/api/v1/admin/products`,
  roleMiddleware(["Admin"]),
  controller.fetchProductsByAdmin
);

router.get(
  "/api/v1/admin/products/:productId",
  roleMiddleware(["Admin"]),
  controller.fetchProductById
);

router.post(
  `/api/v1/admin/products`,
  [roleMiddleware(["Admin"]), upload.any()],
  controller.createProduct
);

module.exports = router;
