const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../service/userService');
const UserDto = require('../Dtos/userDto');
const { ServerError, ConflictError } = require('../utils/AppError');

const regController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let { fingerprint } = req;

    email = email.trim().toLowerCase();
    password = password.trim();

    const passwordHash = await bcrypt.hash(password, 10);

    const [user, isCreated] = await UserService.findOrCreate(
      email,
      passwordHash,
    );

    if (!isCreated) {
      next(new ConflictError('It is impossible to register such a user'));
      // res
      //   .status(201)
      //   .json({ status: 'fail', msg: 'This email is already in use' });
      // return;
    }

    // id, email, role
    const userData = UserDto.userJustRegDto(user);

    req.session.save(() => {
      res.status(200).json({
        status: 'success',
        msg: 'Successful registration',
        data: userData,
      });
    });
  } catch (error) {
    next(new ServerError(error));
  }
};

module.exports = regController;
