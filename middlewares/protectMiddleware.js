const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const { catchAsync, userRoleLevel } = require('../utils/utils');
const { LogToFile } = require('../errors/writeError');

//
/**
 * prevents unlogged in users
 */
exports.protect = catchAsync(async (req, res, next) => {
  // console.log(req);
  if (req.user) return next();
  const cookie = req.cookies[process.env.login];
  if (!cookie) return next(new Error('login to get access'));

  // decoding the cookie
  const decode = await promisify(jwt.verify)(cookie, process.env.loginToken);
  const { exp, id, iat } = decode;

  // checking for active account
  console.log({ exp, id, iat });
  const user = await User.findByPk(id);
  // console.log(user);
  if (!user.active) return next(new Error('your account is not active'));

  // checking for cookie expery
  if (Date.now() > exp * 1000) return next(new Error('please log in again'));

  // checking if password has been changed after loggin in and no new cookie
  if (user.passwordChangedAt && new Date(user.passwordChangedAt).getTime() > iat * 1000) {
    return next(new Error('please log again'));
  }

  req.user = user;
  if (userRoleLevel(user.role) > 1) req.admin = user;
  next();
});

//
/**
 * prevents unlogged in users
 */
exports.loggedIn = catchAsync(async (req, res, next) => {
  const cookie = req.cookies[process.env.login];
  req.cookies.host = req.get('host');
  new LogToFile(req.cookies);
  if (!cookie) return next();

  // decoding the cookie
  const decode = await promisify(jwt.verify)(cookie, process.env.loginToken);
  const { exp, id, iat } = decode;

  // checking for active account
  // console.log({ exp, id, iat });
  const user = await User.findByPk(id);
  // console.log(user);
  if (!user.active) return next();

  // checking for cookie expery
  if (Date.now() > exp * 1000) return next();

  // checking if password has been changed after loggin in and no new cookie
  if (user.passwordChangedAt && new Date(user.passwordChangedAt).getTime() > iat * 1000) {
    return next();
  }

  req.user = user;
  if (userRoleLevel(user.role) > 1) req.admin = user;
  next();
});

//
/**
 * allows employess and peaple above
 */
exports.aboveUser = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (userRoleLevel(role) < 2) return next(new Error('you do not have access to perform this action'));

  next();
});

/**
 * allows admins and people above
 */
exports.aboveEployee = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (userRoleLevel(role) < 3) return next(new Error('you do not have access to perform this action'));

  next();
});

/**
 * allow people above admins
 */
exports.aboveAdmin = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (userRoleLevel(role) < 4) return next(new Error('you do not have access to perform this action'));

  next();
});

/**
 * allows people above superadmins
 */
exports.aboveSuperAdmin = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (userRoleLevel(role) < 5) return next(new Error('you do not have access to perform this action'));

  next();
});
