const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send("Access denied");
  }

  jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
    if (error || !decoded) {
      return res.status(400).send("Invalid token");
    }

    next();
  });
};