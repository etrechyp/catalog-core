const { response } = require("express");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const axios = require("axios");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found",
      });
    }
    
    if ( !user.verified ) {
      return res.status(401).json({
        ok: false,
        msg: "User not verified",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!user || !user.status || !validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Wrong email or password",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      msg: "login OK",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: "Internal server error, please contact with Admin",
    });
  }
};

const generateSC = () => {
  return new Promise((resolve, reject) => {
    const data = {
      Username: process.env.CS_USER,
      Password: process.env.CS_PASS,
    };
    axios
      .post(`${process.env.CS_URL}token`, data)
      .then((resp) => {
        resolve(resp.data);
      })
  });
}

const scToken = async (req, res = response) => {
  generateSC().then((tokendata) => {
      res.status(202).json({
        ok: true,
        access_token: tokendata.access_token,
        issued: tokendata[".issued"],
        expires: tokendata[".expires"]
        
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        ok: false,
        msg: err,
      });
    });
};

const renewToken = async (req, res = response) => {
  const { user } = req;
  const token = await generateJWT(user.id);
  res.json({
    user,
    token,
  });
};

module.exports = {
  generateSC,
  login,
  scToken,
  renewToken,
};
