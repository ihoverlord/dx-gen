const jwt = require("jsonwebtoken");
const config = require("../project/config");

module.exports = function (req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send({ error: true, message: "Access denied. No token provided." });

  try {
    jwt.verify(token, config.AUTH_TOKEN_SECRECT);
    next();
  } catch (ex) {
    res.status(400).send({ error: true, message: "Invalid token." });
  }
};