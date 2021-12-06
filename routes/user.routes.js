const { Router } = require("express");
const { emailExist } = require("../helpers/db-validators");
const { check } = require("express-validator");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/user.controller");
const { validateJWT, isAdminRole } = require("../middlewares");

const router = Router();

router.get("/", validateJWT, userGet);

router.put("/:id", [ validateJWT, isAdminRole ], userPut);

router.post("/", check("email").custom(emailExist), userPost);

router.delete("/:id", [validateJWT, isAdminRole], userDelete);

module.exports = router;
