require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const white_lists = ["/", "/register", "/login", "/forgot-password"];
  if (white_lists.includes(req.originalUrl.replace("/v1/api", ""))) {
    return next();
  }

  if (req?.headers?.authorization?.split(" ")?.[1]) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Token hết hạn/hoặc không hợp lệ" });
    }
  } else {
    return res
      .status(401)
      .json({
        message: "Bạn chưa truyền Access Token ở header/Hoặc token bị hết hạn",
      });
  }
};
module.exports = auth;
