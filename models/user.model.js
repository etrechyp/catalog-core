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
    required: true,
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

  //TODO add validation for country, state, city
  country: { 
    type: String,
    required: [true, "country is mandatory"],
    validate: {
      validator: (country) => {
        return country.length > 0;
      },
      message: "country must not be an empty field",
    },
  },

  state: { 
    type: String,
    required: [true, "state is mandatory"],
    validate: {
      validator: (country) => {
        return country.length > 0;
      },
      message: "region must not be an empty field",
    },
  },
  
  city: { 
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

  businessStyle: {
    type: String,
    required: [true, "style of business is mandatory"],
    enum: {
      values: ["Wholesaler", "Store"],
      message: "style of business is not valid",
    },
  },

  yearStablished: {
    type: Number,
    required: [true, "year stablished is mandatory"],
    validate: {
      validator: (year) => {
        const usRegex = /^[0-9]{4}$/;
        return usRegex.test(year);
        
      },
      message: "year established is not valid",
    },
  },

  isAdmin: {
    type: Boolean,
    default: false,
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
