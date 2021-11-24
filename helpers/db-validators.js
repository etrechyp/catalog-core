const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/user.model");

const validateObjectId = (_id, type) => {
  if (!ObjectId.isValid(_id)) {
    return {
      ok: false,
      err: `${type} id not valid`,
    };
  }
  return {
    ok: true,
  };
};

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`${email} already exist`);
  }
};

module.exports = {
  validateObjectId,
  emailExist
};
