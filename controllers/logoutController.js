const { ServerError, BadRequestError } = require('../utils/AppError');

const logOutController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.rf_tkn;
    console.log('▶ ⇛ refreshToken:', refreshToken);
    // req.session.destroy((err) => {
    //   if (err) {
    //     next(new BadRequestError('Failed to log out'));
    //   } else {
    //     res.status(200).json({
    //       status: 'success',
    //       msg: 'You have successfully logged out',
    //     });
    //   }
    // });
    // res.clearCookie(process.env.SESSION_NAME);
  } catch (error) {
    next(new ServerError(error));
  }
};

module.exports = logOutController;
