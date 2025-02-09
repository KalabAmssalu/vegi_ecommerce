import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // Return null if token is invalid
  }
};

const combinedAuth = (req, res, next) => {
  // Check for token in cookies first
  const cookieToken = req.cookies.jwt;
  if (cookieToken) {
    const decoded = verifyToken(cookieToken);
    if (decoded) {
      req.user = decoded;
      console.log("Decoded User (Cookie):", req.user);
      return next();
    }
  }

  // If cookie token is missing or invalid, check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const headerToken = authHeader.split(" ")[1];
    const decoded = verifyToken(headerToken);
    if (decoded) {
      req.user = decoded;
      console.log("Decoded User (Header):", req.user);
      return next();
    }
  }

  // If no valid tokens found, send error
  res.status(401).json({ msg: "No valid token, authorization denied" });
};

export default combinedAuth;
