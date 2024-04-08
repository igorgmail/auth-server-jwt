const jwt = require('jsonwebtoken');
const UserDto = require('../Dtos/userDto');
const {
  ServerError,
  ConflictError,
  BadRequestError,
} = require('../utils/AppError');

const UserService = require('../services/userService');
const SessionsService = require('../services/sessionsService');
const TokenService = require('../services/tokenServices');

const regController = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await UserService.registrationUser(email, password); // return user | null

    if (!user) {
      next(new ConflictError('It is impossible to register such a user'));
    }

    // id, email, role
    const userData = UserDto.userJustRegDto(user);
    // email, role
    const userPayloadForToken = UserDto.userForTokenDto(user);

    // create JWTs
    const newTokens = await TokenService.newPairOfTokens(userPayloadForToken);

    let { fingerprint } = req;
    const user_ip = req.clientIp; // IP-client
    const dataForSession = SessionsService.makeDataObject(
      user.id,
      fingerprint,
      newTokens.refresh_token,
      user_ip,
    );

    const newSession = await SessionsService.addNewSession(dataForSession);

    console.log('▶ ⇛ Controller newSession:', newSession);

    if (newSession) {
      // Creates Secure Cookie with refresh token
      res.cookie('rf_tkn', newTokens.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: 'success',
        msg: 'Successful registration',
        data: userData,
        acs_token: newTokens.access_token,
      });
    } else {
      next(new BadRequestError('Error creating session'));
    }
  } catch (error) {
    next(new ServerError(error));
  }
};

module.exports = regController;
