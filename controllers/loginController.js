const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../service/userService');
const { UnauthorizedError, ServerError } = require('../utils/AppError');
const TokenService = require('../utils/tokenGenerate');
const UserDto = require('../Dtos/userDto');

const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let { fingerprint } = req;

    email = email.trim().toLowerCase();
    password = password.trim();
    const cookies = req.cookies;

    const user = await UserService.findUserFromEmail(email);

    if (!user) {
      next(new UnauthorizedError('User and/or password not found'));
      return;
    }

    const isTrue = await bcrypt.compare(password, user.password);

    if (!isTrue) {
      next(new UnauthorizedError('User and/or password not found'));
      return;
    }

    // id, name, email, role, isConfirmed
    const userData = UserDto.userFullDto(user);
    const userDataForToken = UserDto.userForTokenDto(user);

    // create JWTs
    const accessToken =
      await TokenService.generateAccessToken(userDataForToken);
    const newRefreshToken =
      await TokenService.generateRefreshToken(userDataForToken);

    // Creates Secure Cookie with refresh token
    res.cookie('rf_tkn', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      msg: 'Successful login',
      data: userData,
      acs_token: accessToken,
    });
  } catch (error) {
    next(new ServerError(error));
  }
};
module.exports = loginController;
