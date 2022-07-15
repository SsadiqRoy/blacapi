const crypto = require("crypto");

exports.createId = function () {
  return crypto.randomUUID({ disableEntropyCache: true }).split("-").join("");
};

//

exports.catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
