const { Router } = require('express');

const {
  registerUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  getUserProfile,
  edit,
  getAllUsers,
} = require('../controllers/user.controller');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password/:token', resetPassword);

router.get('/logout', isAuthenticatedUser, logOut);
router.get('/profile', isAuthenticatedUser, getUserProfile);
router.put('/profile/update/:id', isAuthenticatedUser, edit('userUpdated', 'name', 'user updated'));
router.get('/all', isAuthenticatedUser, getAllUsers);

module.exports = router;
