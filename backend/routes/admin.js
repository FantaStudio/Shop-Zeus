const { Router } = require(`express`);
const router = Router();
const controller = require("../controllers/admin");
const roleMiddleware = require("../middleware/role");

router.get(
  `/api/v1/admin/users`,
  roleMiddleware(["Admin"]),
  controller.fetchUsers
);

module.exports = router;
