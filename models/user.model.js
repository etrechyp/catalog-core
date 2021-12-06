const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (name) => {
        return name.length > 0 && name.length <= 64;
      },
      message: `that is not a valid name!`,
    },
  },

  lastName: {
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

  addressLine1: {
    type: String,
    required: [true, "address is mandatory"],
    validate: {
      validator: (address) => {
        return address.length > 0;
      },
      message: "address must not be an empty field",
    },
  },

  addressLine2: {
    type: String,
  },

  //TODO add validation for country, state, city
  countryName: { 
    type: String,
    required: [true, "country is mandatory"],
    validate: {
      validator: (country) => {
        return country.length > 0;
      },
      message: "country must not be an empty field",
    },
  },

  regionName: { 
    type: String,
    required: [true, "region is mandatory"],
    validate: {
      validator: (country) => {
        return country.length > 0;
      },
      message: "region must not be an empty field",
    },
  },
  
  cityName: { 
    type: String,
    required: [true, "city is mandatory"],
    validate: {
      validator: (country) => {
        return country.length > 0;
      },
      message: "city must not be an empty field",
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

  companyName: {
    type: String,
  },

  organizationType: {
    type: String,
  },

  styleOfBusiness: {
    type: String,
    required: [true, "style of business is mandatory"],
    enum: {
      values: ["Manufacturer", "Distributor", "Importer", "Wholesaler", "Retailer"],
      message: "style of business is not valid",
    },
  },

  yearEstablished: {
    type: Number,
    required: [true, "year established is mandatory"],
    validate: {
      validator: (year) => {
        return year > 1900 && year <= Date().getFullYear();
      },
      message: "year established is not valid",
    },
  },

  role: {
    type: String,
    enum: {
      values: ["ADMIN_ROLE", "USER_ROLE"],
      message: "{VALUE} is invalid",
    },
    default: "USER_ROLE",
  },

  //TODO discutir si se debe dejar esto
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
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("Users", UserSchema);
