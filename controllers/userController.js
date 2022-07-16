const User = require("../model/user");

const { createInstance } = require("../middlewares/globalMiddleware");
const { catchAsync } = require("../utils/utils");

//

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await createInstance(User, req.body);

  res.status(201).json({
    status: "success",
    data: user,
  });
});

//

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.update(req.body, { where: { id: req.params.id } });
  const data = await User.findByPk(req.params.id);

  res.status(200).json({
    status: "success",
    meta: user,
    data,
  });
});

//

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.destroy({ where: { id: req.params.id } });

  res.status(200).json({
    status: "success",
    message: "user deleted",
    data: user,
  });
});

//

exports.getAll = catchAsync(async (req, res, next) => {
  const data = await User.findAll();

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

//

exports.getOne = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  res.status(200).json({
    status: "success",
    data: user,
  });
});
