const crypto = require("crypto");

exports.createId = function () {
  return crypto.randomUUID({ disableEntropyCache: true }).split("-").join("");
};

//

exports.catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

exports.userRoleLevel = (role) => {
  const roles = ["user", "employee", "admin", "superadmin", "ssadiq"];
  if (roles.includes(role)) return roles.indexOf(role) + 1;
  else return -1;
};
