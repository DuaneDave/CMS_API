const { Router } = require('express');

const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/user.controller');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password/:token', resetPassword);

module.exports = router;
