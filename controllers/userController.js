const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const User = require('../model/user');

const { deleteOne, getAll, getOne, createInstance } = require('../middlewares/globalMiddleware');
const { catchAsync } = require('../utils/utils');
const AppError = require('../utils/appError');

//

exports.signup = catchAsync(async (req, res, next) => {
  const { email, name, password } = req.body;
  // checking for the requirments
  if (!email || !name || !password) return next(new AppError('email, name and password are all required', 406));

  // creating the user
  req.body = { name, email, password };
  const user = await createInstance(User, req.body);

  // creating login cookie
  const cookie = jwt.sign({ id: user.id }, process.env.loginToken, {
    expiresIn: process.env.loginExp,
  });
  const cookieOption = {
    expires: new Date(Date.now() + +process.env.loginExp),
    secure: true,
    httpOnly: true,
    sameSite: 'None',
    domain: process.env.cookie_domain,
  };

  res.cookie(process.env.login, cookie, cookieOption);

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

//
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('email and password is required', 406));

  const user = await User.findOne({
    where: { email },
    attributes: { include: 'password' },
  });
  if (!user) return next(new AppError('no user found', 404));

  // validating password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return next(new AppError('email or password is incorrect', 401));

  // creating login cookie
  const cookie = jwt.sign({ id: user.id }, process.env.loginToken, {
    expiresIn: process.env.loginExp,
  });

  const cookieOption = {
    expires: new Date(Date.now() + +process.env.loginExp),
    secure: true,
    httpOnly: true,
    sameSite: 'None',
    domain: process.env.cookie_domain,
  };
  // const cookieOption2 = {
  //   expires: new Date(Date.now() + +process.env.loginExp),
  //   secure: true,
  //   httpOnly: true,
  //   sameSite: 'None',
  //   domain: process.env.cors_allowed,
  // };

  // new LogToFile(cookieOption2);

  res.cookie(process.env.login, cookie, cookieOption);
  // res.cookie(process.env.login, cookie, cookieOption2);

  user.password = undefined;
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

//

exports.logout = catchAsync(async (req, res, next) => {
  const user = req.user;

  // creating logout cookie
  const cookie = jwt.sign({ id: user.id }, process.env.loginToken, {
    expiresIn: process.env.logoutExp,
  });

  const cookieOption = {
    expires: new Date(new Date().getTime() + 2000),
    secure: true,
    httpOnly: true,
    sameSite: 'None',
    domain: process.env.cookie_domain,
  };
  res.cookie(process.env.login, cookie, cookieOption);

  res.status(200).json({
    status: 'success',
    message: 'you have succesfully logged out',
  });
});

//

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.user) {
    return res.status(200).json({
      status: 'success',
      data: req.user,
    });
  }
  const cookie = req.cookies[process.env.login];
  if (!cookie)
    return res.status(200).json({
      status: 'success',
      data: req.user,
    });

  // decoding the cookie
  const decode = await promisify(jwt.verify)(cookie, process.env.loginToken);
  const { exp, id, iat } = decode;

  // checking for active account
  const user = await User.findByPk(id);

  if (!user.active)
    return res.status(200).json({
      status: 'success',
      data: req.user,
    });

  // checking for cookie expery
  if (Date.now() > exp * 1000)
    return res.status(200).json({
      status: 'success',
      data: req.user,
    });

  // checking if password has been changed after loggin in and no new cookie
  if (user.passwordChangedAt && new Date(user.passwordChangedAt).getTime() > iat * 1000) {
    return res.status(200).json({
      status: 'success',
      data: req.user,
    });
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

// exports.updateUser = update(User);
exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const body = { name, email };

  const meta = await User.update(body, { where: { id: req.params.id } });
  const data = await User.findByPk(req.params.id);

  res.status(200).json({
    status: 'success',
    meta,
    data,
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, password } = req.body;

  if (!oldPassword || !password) return next(new AppError('Old password or New password is not available', 406));
  const user = await User.findByPk(req.params.id, { attributes: { include: 'password' } });

  const valid = await bcrypt.compare(oldPassword, user.password);

  if (!valid) return next(new AppError('password is incorrect', 406));

  const newUser = await User.update({ password, passwordChangedAt: Date.now() }, { where: { id: req.params.id } });

  res.status(203).json({
    status: 'success',
    data: newUser,
  });
});

exports.deleteUser = deleteOne(User);
exports.allUsers = getAll(User, [['name', 0]]);
exports.oneUser = getOne(User);
