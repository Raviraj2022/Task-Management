const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  //   console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
