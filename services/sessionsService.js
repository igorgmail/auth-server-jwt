const SessionsRepo = require('../repositories/sessionsRepo');

class SessionsService {
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
