const { Router } = require("express");
const { check } = require("express-validator");
const { login, scToken, renewToken } = require("../controllers/auth.controller");
const { validateJWT } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
  ],
  login
);

router.post("/sc_token", validateJWT, scToken);

router.post("/", renewToken);

module.exports = router;
