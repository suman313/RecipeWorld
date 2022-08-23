import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodeData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");
      req.UserId = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);
      req.UserId = decodeData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
