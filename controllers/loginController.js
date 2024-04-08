const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, ServerError } = require('../utils/AppError');
const UserDto = require('../Dtos/userDto');
const UserService = require('../services/userService');
const TokenService = require('../services/tokenServices');
const SessionsRepo = require('../repositories/sessionsRepo');

const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let { fingerprint } = req;
    console.log('▶ ⇛ fingerprint:', fingerprint);
    const ip = req.clientIp; // IP-адрес клиента
    console.log('▶ ⇛ ip:', ip);
    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await UserService.checkUserLogin(email, password); // return user | null

    if (!user) {
      next(new UnauthorizedError('User and/or password not found'));
      return;
    }

    // id, name, email, role, isConfirmed
    const userData = UserDto.userFullDto(user);
    // name, email
    const userPayloadForToken = UserDto.userForTokenDto(user);

    // create JWTs
    const new_tokens = await TokenService.newPairOfTokens(userPayloadForToken);

    // const addSession = await SessionsRepo.addNewSessionToken(
    //   new_tokens.refresh_token,
    // );
    // Creates Secure Cookie with refresh token
    res.cookie('rf_tkn', new_tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      msg: 'Successful login',
      data: userData,
      acs_token: new_tokens.access_token,
    });
  } catch (error) {
    next(new ServerError(error));
  }
};
module.exports = loginController;
