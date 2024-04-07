const jwt = require('jsonwebtoken');

class TokenService {
  static async generateAccessToken(payload) {
    return await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1m',
    });
  }
  static async generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
  }
}

module.exports = TokenService;
