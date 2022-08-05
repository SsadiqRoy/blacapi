const { catchAsync, userRoleLevel } = require("../utils/utils");

exports.aboveUser = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (userRoleLevel(role) < 2)
    return next(new Error("you do not have access to perform this action"));

  next();
});

exports.aboveEployee = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (userRoleLevel(role < 3))
    return next(new Error("you do not have access to perform this action"));

  next();
});

exports.aboveAdmin = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (userRoleLevel(role) < 4)
    return next(new Error("you do not have access to perform this action"));

  next();
});

exports.aboveSuperAdmin = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (userRoleLevel(role) < 5)
    return next(new Error("you do not have access to perform this action"));

  next();
});
