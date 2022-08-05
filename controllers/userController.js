const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../model/user");

const {
  deleteOne,
  update,
  getAll,
  getOne,
  search,
  createInstance,
} = require("../middlewares/globalMiddleware");
const { catchAsync } = require("../utils/utils");
// const { catchAsync } = require("../utils/utils");

//

// exports.createUser = create(User);

exports.signup = catchAsync(async (req, res, next) => {
  const { email, name, password } = req.body;
  // checking for the requirments
  if (!email || !name || !password)
    return next(new Error("email, name and password are all required"));

  // creating the user
  req.body = { name, email, password };
  const user = await createInstance(User, req.body);

  // creating login cookie
  const cookie = jwt.sign({ id: user.id }, process.env.loginToken, {
    expiresIn: process.env.loginExp,
  });
  const cookieOption = {
    expires: new Date(new Date().getTime() + +process.env.loginExp * 1000),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  };
  res.cookie(process.env.login, cookie, cookieOption);

  res.status(200).json({
    status: "success",
    data: user,
  });
  // console.log(res.cookie);
});

//
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new Error("email and password is required"));

  const user = await User.findOne({
    where: { email },
    attributes: { include: "password" },
  });
  if (!user) return next(new Error("no user found"));

  // validating password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return next(new Error("email or password is incorrect"));

  // creating login cookie
  const cookie = jwt.sign({ id: user.id }, process.env.loginToken, {
    expiresIn: process.env.loginExp,
  });
  const cookieOption = {
    expires: new Date(new Date().getTime() + +process.env.loginExp * 1000),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  };
  res.cookie(process.env.login, cookie, cookieOption);

  res.status(200).json({
    status: "success",
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
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  };
  res.cookie(process.env.login, cookie, cookieOption);

  res.status(200).json({
    status: "success",
    message: "you have succesfully logged out",
  });
});

exports.updateUser = update(User);
exports.deleteUser = deleteOne(User);
exports.allUsers = getAll(User);
exports.oneUser = getOne(User);

exports.search = search(User, [
  ["name", 0],
  // ["email", 0],
]);
