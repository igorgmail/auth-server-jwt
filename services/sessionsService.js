const { Sessions } = require('../db/models');
const SessionsRepo = require('../repositories/sessionsRepo');
class SessionsService {
  static async addNewSessionToken(data) {
    const { user_id, finger_print, refresh_token, user_ip } = data;
    try {
      const new_session = await Sessions.create({
        user_id,
        finger_print,
        refresh_token,
        user_ip,
      });
      console.log('▶ ⇛ new_session:', new_session);
      new_session ? new_session : null;
    } catch (e) {
      throw e;
    }
  }

  static makeDataObject(user_id, finger_print, refresh_token, user_ip) {
    return {
      user_id,
      finger_print: finger_print.hash,
      refresh_token,
      user_ip,
    };
  }

  static async addNewSession(data) {
    try {
      const new_session = await SessionsRepo.addNewSession(data);
      return new_session ? new_session : null;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = SessionsService;
