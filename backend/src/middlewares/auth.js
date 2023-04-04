const { decodeJWT } = require("../services/jwtService");

const authorization = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) throw new Error();

    const data = decodeJWT(token);

    req.userId = data.id;
    req.userEmail = data.email;

    return next();
  } catch (e) {
    return res.sendStatus(401);
  }
};

module.exports = authorization;
