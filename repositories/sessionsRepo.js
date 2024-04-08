const { Sessions } = require('../db/models');

class SessionsRepo {
  static async addNewSession(data) {
    try {
      const new_session = await Sessions.create({
        user_id: data.user_id,
        finger_print: data.finger_print,
        refresh_token: data.refresh_token,
        user_ip: data.user_ip,
      });
      return new_session ? new_session.dataValues : null;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = SessionsRepo;
