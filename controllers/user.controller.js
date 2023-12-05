// const User = require('../models/user.model');

// const ErrorHandler = require('../utils/errorHandler');
// const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const sendToken = require('../utils/jwtToken');
// const sendEmail = require('../utils/sendEmail');

// exports.registerUser = catchAsyncErrors(async (req, res, next) => {
//   const { name, email, password } = req.body;

//   const isExisting = await User.findOne({ email });

//   if (isExisting) return next(new ErrorHandler('User already exists', 400));

//   const user = await User.create({
//     name,
//     email,
//     password,
//   });

//   const token = user.getJwtToken();

//   res.status(201).json({
//     success: true,
//     user,
//     token,
//   });
// });

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
}

module.exports = new UserController();
