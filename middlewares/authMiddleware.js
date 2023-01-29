const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = await req?.headers?.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .send({ message: 'Access to this route is unauthorized' });
    }
    const token = await authHeader.split(' ')[1];
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .send({ message: 'Access to this route is forbidden' });
      }
      req.decoded = decoded;
      console.log('decoded ', decoded);
      console.log('Auth header ', authHeader);
      next();
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

module.exports = {
  verifyToken,
};
