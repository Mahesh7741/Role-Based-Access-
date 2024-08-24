const jwt = require("jsonwebtoken");
const SECRET_KEY = "mahesh";

function Authorization(req, res, next) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Token is not present" });
    }

    // Extract token (assuming it starts with "Bearer ")
    const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid" });
      }

      // Attach the decoded token to the request object
      req.user = decoded;

      // Pass control to the next middleware
      next();
    });
  } catch (e) {
    res.status(500).json({ message: "Server fetch error" });
  }
}

module.exports = {
  authorization:Authorization,
};
