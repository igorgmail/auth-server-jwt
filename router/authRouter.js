const Router = require('express').Router;
const router = new Router();

const authChecker = require('../middleware/authChecker');
const { validateLoginField } = require('../middleware/fieldValidation');

const {
  loginController,
  regController,
  logOutController,
  isAuthController,
} = require('../controllers');

// Routers
router.post('/login', validateLoginField, loginController);

router.post('/registration', validateLoginField, regController);

router.get('/logout', logOutController);

router.get('/auth', isAuthController);

router.get('/activate/:link');
// router.get('/refresh');

module.exports = router;
