const isAuthController = async (req, res) => {
  console.log('▶ ⇛ req:Header', req.headers);
  console.log('▶ ⇛ req:req.clientIp', req.headers.authorization);
  console.log('▶ ⇛ req:req.Cookies', req.cookies);
  try {
    if (true) {
      // const userData = {
      //   userId: req.session.user.id,
      //   userName: req.session.user.name,
      //   userEmail: req.session.user.email,
      // };
      res.cookie('jwt', '324hjhkj4324234');
      res.status(200).json({
        status: 'success',
        msg: 'User is authorized',
        // data: userData,
      });
    } else {
      res.status(201).json({ status: 'fail', msg: 'User is not authorized' });
    }
  } catch (error) {
    next(new CustomError('Server error during authorization', 500));
  }
};

module.exports = isAuthController;
