const { Users } = require('../db/models');

class UserService {
  async findUserFromEmail(email) {
    try {
      const user = await Users.findOne({ where: { email }, raw: true });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async findOrCreate(userEmail, hashPassword) {
    try {
      const [user, created] = await Users.findOrCreate({
        where: { email: userEmail },
        defaults: {
          password: hashPassword,
        },
      });
      return [user, created];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new UserService();
