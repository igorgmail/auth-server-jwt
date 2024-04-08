const { raw } = require('express');
const { Users } = require('../db/models');
const UserRepo = require('../repositories/usersRepo');
const bcrypt = require('bcrypt');

class UserService {
  static async checkUserLogin(email, password) {
    try {
      const user = await UserRepo.findUserFromEmail(email);
      const isTrue = await bcrypt.compare(password, user.password);
      return isTrue ? user : null;
    } catch (e) {
      throw e;
    }
  }

  static async registrationUser(userEmail, password) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const [user, created] = await UserRepo.findOrCreate(
        userEmail,
        passwordHash,
      );
      return created ? user : null;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserService;
