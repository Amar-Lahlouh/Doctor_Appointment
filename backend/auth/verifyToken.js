import jwt from "jsonwebtoken";

export const VerifyAuth = (req, res, next) => {
  const token = req.cookies?.accessToken;
  console.log(token, "token");
  // 🔹 If no token, stop and send response
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // 🔹 Verify the token
  jwt.verify(token, "jwt-access-token-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // 🔹 Attach user info to the request
    req.user = decoded;
    req.id = decoded.id; // add this line so your getCheckoutSession can use it
    next(); // ✅ Move to the next middleware or route
  });
};
