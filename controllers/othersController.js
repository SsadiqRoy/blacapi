const { catchAsync } = require("../utils/utils");

const User = require("../model/user");

exports.changeRole = catchAsync(async (req, res, next) => {
  // setting role to the new role
  const body = { role: req.body.role };

  const meta = await User.update(body, { where: { id: req.params.id } });
  const data = await User.findByPk(req.params.id);

  res.status(200).json({
    status: "success",
    meta,
    data,
  });
});
