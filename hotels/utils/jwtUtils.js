const jwt = require('jsonwebtoken');
const jwtSecret = 'your-secret-key'; // Use the same secret key as in the main app

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
  });
};

exports.verifyToken = (token, callback) => {
  jwt.verify(token, jwtSecret, callback);
};
