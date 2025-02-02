import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.cookies.jwt; // Get the token from the cookies

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to req.user
    console.log("decoded", req.user); // Log decoded user
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
