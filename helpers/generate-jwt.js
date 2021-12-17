const JWT = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    JWT.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "1h", // 1 hour
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("the token could not be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
