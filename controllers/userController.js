const User = require("../model/user");

const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
// const { catchAsync } = require("../utils/utils");

//

exports.createUser = create(User);
exports.updateUser = update(User);
exports.deleteUser = deleteOne(User);
exports.allUsers = getAll(User);
exports.oneUser = getOne(User);
