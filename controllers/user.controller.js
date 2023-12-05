const crypto = require('crypto');

const UserRepo = require('../repositories/user.repository');
const User = require('../models/user.model');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

class UserController {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async userExists(email) {
    return await this.userRepo.getOne({ email });
  }

  async getOAuthDetails(googleAccessToken) {
    const fetchedUser = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      }
    );

    const { given_name, email } = await fetchedUser.json();

    return {
      name: given_name,
      email,
      password: email + process.env.GOOGLE_SECRET,
    };
  }

  registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, googleAccessToken } = req.body;

    let user;

    if (googleAccessToken) {
      const { name, email, password } = await this.getOAuthDetails(
        googleAccessToken
      );

      const isExisting = await this.isExisting(email);

      if (isExisting) return next(new ErrorHandler('User already exists', 400));

      user = await this.userRepo.create({
        name,
        email,
        password,
      });
    } else {
      const isExisting = await this.userExists(email);

      if (isExisting) return next(new ErrorHandler('User already exists', 400));

      user = await this.userRepo.create({
        name,
        email,
        password,
      });
    }

    const token = user.getJwtToken();

    res.status(201).json({
      success: true,
      user,
      token,
    });
  });

  loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password, googleAccessToken } = req.body;

    let user;

    if (googleAccessToken) {
      const { email } = await this.getOAuthDetails(googleAccessToken);

      user = await this.userRepo.getOne({ email });
    } else {
      if (!email || !password)
        return next(new ErrorHandler('Please enter email & password', 400));

      const isExisting = await this.userExists(email);

      if (!isExisting)
        return next(new ErrorHandler('Invalid Email or Password', 401));

      user = await User.findOne({ email }).select('+password');

      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched)
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res);
  });

  logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  });

  forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return next(new ErrorHandler('User not found with this email', 404));

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/user/reset_password/${resetToken}`;

    const message = `Hello ${user.name}!\n\nYou requested a password update on CMS_API. Click the link below to set your new password for your account.\n\n${resetUrl}\n\nIf you have not requested this, or believe you've recieved this in error, contact support@CMS_API.com.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'CMS_API Password Recovery',
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  });

  resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await this.userRepo.getOne({ resetPasswordToken });
    const expired = new Date(user?.resetPasswordExpire) > new Date() || false;

    if (!user || expired)
      return next(
        new ErrorHandler(
          'Password reset token is invalid or has been expired',
          400
        )
      );

    if (req.body.password !== req.body.confirmPassword)
      return next(new ErrorHandler('Password does not match', 400));

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  });

  getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await this.userRepo.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  });

  updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await this.userRepo.update(req.user.id, newUserData);

    res.status(200).json({
      success: true,
      user,
    });
  });

  getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await this.userRepo.getAll();

    res.status(200).json({
      success: true,
      users,
    });
  });
}

module.exports = new UserController();
