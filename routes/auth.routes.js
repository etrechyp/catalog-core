const { Router } = require("express");
const { check } = require("express-validator");
const { login, renewToken } = require("../controllers/auth.controller");
const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
    validateFields,
  ],
  login
);

router.get("/", validateJWT, renewToken);

module.exports = router;
