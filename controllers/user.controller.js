const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { validateObjectId } = require("../helpers/db-validators");

const userGet = async (req, res = response) => {
  try {
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true };
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(from)).limit(Number(limit)),
    ]);

    res.json({
      ok: true,
      users,
      total,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      err,
    });
  }
};

const userPost = async (req, res = response) => {
  try {
    const {
      email,
      password,
      role,
      ...leftover
    } = req.body;
    const user = new User({
      email,
      password,
      role,
      ...leftover,
    });

    if (password.length < 6)
      throw new Error("Password must be at least 6 characters long").message;

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.status(201).json({
      ok: "true",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      err,
    });
  }
};

const userPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, ...leftover } = req.body;

    const idValidationResult = validateObjectId(id, "user");
    if (!idValidationResult.ok) throw new Error(idValidationResult.err).message;

    if (password) {
      const salt = bcryptjs.genSaltSync();
      leftover.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, leftover, {
      new: true,
      runValidators: true,
    });

    res.json({
      ok: "true",
      user,
    });
  } catch (err) {
    res.status(500).json({
      ok: "false",
      err,
    });
  }
};

const userDelete = async (req, res = response) => {
  try {
    const { id: idToDisable } = req.params;
    const adminUser = req.user;
    const idValidationResult = validateObjectId(idToDisable, "user");

    if (!idValidationResult.ok) throw new Error(idValidationResult.err).message;

    if (adminUser.id === idToDisable)
      throw new Error("You can't disable yourself").message;

    const user = await User.findById(idToDisable);

    if (!user.status)
      throw new Error(`this user has already been deleted before`).message;

    const disabledUser = await User.findByIdAndUpdate(
      idToDisable,
      { status: false },
      { new: true }
    );

    res.json({
      ok: "true",
      adminUser,
      disabledUser,
    });
  } catch (err) {
    res.status(500).json({
      ok: "false",
      err,
    });
  }
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
