const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name) => {
        return name.length > 0 && name.length <= 64;
      },
      message: `that is not a valid name!`,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => {
        return (
          email.length > 0 &&
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        );
      },
      message: `that is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },

  role: {
    type: String,
    enum: {
      values: ["ADMIN_ROLE", "USER_ROLE"],
      message: "{VALUE} is invalid",
    },
    default: "USER_ROLE",
  },
  customerLocation: {
    type: String,
    enum: {
      values: ["local", "international"],
      message: "{VALUE} is invalid",
    },
    default: "local",
  },
  status: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: [true, "address is mandatory"],
    validate: {
      validator: (address) => {
        return address.length > 0;
      },
      message: "address must not be an empty field",
    },
  },
  phone: {
    type: String,
    validate: {
      validator: (phone) => {
        const usRegex = /^[0-9]{3}-{0,1}[0-9]{3}-{0,1}[0-9]{4}$/;
        return usRegex.test(phone);
      },
      message: "phone number is not valid",
    },
  },
  zipcode: {
    type: String,
    validate: {
      validator: (zipcode) => {
        const usRegex = /^[0-9]{5}$/;
        return usRegex.test(zipcode);
      },
    },
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("Users", UserSchema);
