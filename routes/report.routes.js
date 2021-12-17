const { Router } = require("express");
const {
  generateReport,
  sendReport,
} = require("../controllers/report.controller");
const { validateJWT, isAdminRole } = require("../middlewares");

const router = Router();

router.post("/", validateJWT, generateReport);

router.get("/:id", sendReport);

module.exports = router;
