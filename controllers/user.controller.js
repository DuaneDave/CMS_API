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

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class UserController {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async userExists(email) {
    return await this.userRepo.getOne({ email });
  }

  registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, googleAccessToken } = req.body;

    let user;

    if (googleAccessToken) {
      console.log('here');
      const fetchedUser = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        }
      );

      const { given_name, email } = await fetchedUser.json();
      const isExisting = await this.isExisting(email);

      if (isExisting) return next(new ErrorHandler('User already exists', 400));

      user = await this.userRepo.create({
        name: given_name,
        email,
        password: email + process.env.GOOGLE_SECRET,
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

 
}

module.exports = new UserController();
