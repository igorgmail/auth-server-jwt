const { raw } = require('express');
const { Users } = require('../db/models');

class UserRepo {
  static async findUserFromEmail(email) {
    try {
      const user = await Users.findOne({ where: { email }, raw: true });
      return user;
    } catch (e) {
      throw e;
    }
  }

  static async findOrCreate(userEmail, hashPassword) {
    try {
      const [user, created] = await Users.findOrCreate({
        where: { email: userEmail },
        defaults: {
          password: hashPassword,
        },
      });
      return [user.dataValues, created];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserRepo;
