const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const User = require('../model/user');

const { deleteOne, getAll, getOne, search, createInstance } = require('../middlewares/globalMiddleware');
const { catchAsync } = require('../utils/utils');
// const { catchAsync } = require("../utils/utils");

//

exports.signup = catchAsync(async (req, res, next) => {
  const { email, name, password } = req.body;
  // checking for the requirments
  if (!email || !name || !password) return next(new Error('email, name and password are all required'));

  // creating the user
  req.body = { name, email, password };
  const user = await createInstance(User, req.body);

  // creating login cookie
  const cookie = jwt.sign({ id: user.id }, process.env.loginToken, {
    expiresIn: process.env.loginExp,
  });
  const cookieOption = {
    expires: new Date(Date.now() + +process.env.loginExp),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  };
  res.cookie(process.env.login, cookie, cookieOption);

  res.status(200).json({
    status: 'success',
    data: user,
  });
  // console.log(res.cookie);
});

//
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new Error('email and password is required'));

  const user = await User.findOne({
    where: { email },
    attributes: { include: 'password' },
  });
  if (!user) return next(new Error('no user found'));

  // validating password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return next(new Error('email or password is incorrect'));

  // creating login cookie
  const cookie = jwt.sign({ id: user.id }, process.env.loginToken, {
    expiresIn: process.env.loginExp,
  });
  // console.log(process.env.loginExp / 1000000 / 60);
  const cookieOption = {
    expires: new Date(Date.now() + +process.env.loginExp),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  };
  res.cookie(process.env.login, cookie, cookieOption);

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
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  };
  res.cookie(process.env.login, cookie, cookieOption);

  res.status(200).json({
    status: 'success',
    message: 'you have succesfully logged out',
  });
});

//

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // console.log(req);
  if (req.user) {
    return res.status(200).json({
      status: 'success',
      data: req.user,
    });
  }
  const cookie = req.cookies[process.env.login];
  if (!cookie) return next(new Error('login to get access'));

  // decoding the cookie
  const decode = await promisify(jwt.verify)(cookie, process.env.loginToken);
  const { exp, id, iat } = decode;

  // checking for active account
  // console.log({ exp, id, iat });
  const user = await User.findByPk(id);
  // console.log(user);
  if (!user.active) return next(new Error('your account is not active'));

  // checking for cookie expery
  if (Date.now() > exp * 1000) return next(new Error('please log in again'));

  // checking if password has been changed after loggin in and no new cookie
  if (user.passwordChangedAt && new Date(user.passwordChangedAt).getTime() > iat * 1000) {
    return next(new Error('please log again'));
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

  if (!oldPassword || !password) return next(new Error('Old password or New password is not available'));
  const user = await User.findByPk(req.params.id, { attributes: { include: 'password' } });
  // console.log(user.password);
  const valid = await bcrypt.compare(oldPassword, user.password);

  if (!valid) return next(new Error('password is incorrect'));

  const newUser = await User.update({ password, passwordChangedAt: Date.now() }, { where: { id: req.params.id } });

  res.status(203).json({
    status: 'success',
    data: newUser,
  });
});

exports.deleteUser = deleteOne(User);
exports.allUsers = getAll(User);
exports.oneUser = getOne(User);

exports.search = search(User, [
  ['name', 0],
  // ["email", 0],
]);
