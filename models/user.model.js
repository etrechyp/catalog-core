const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatoty"],
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("Users", UserSchema);
