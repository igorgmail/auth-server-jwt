const jwt = require('jsonwebtoken');

class TokenService {
  static async generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1m',
    });
  }
  static async generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
  }

  static async newPairOfTokens(payload) {
    try {
      const access_token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1m',
      });

      const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '30d',
      });

      return { access_token, refresh_token };
    } catch (e) {
      throw e;
    }
  }
}

module.exports = TokenService;
