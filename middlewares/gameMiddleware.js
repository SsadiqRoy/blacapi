const { catchAsync } = require("../utils/utils");

exports.beforeCreate = catchAsync(async (req, res, next) => {
  const { tags, companies, campany } = req.body;
  req.body.user = req.user.id;

  if (campany) req.body.company = company.toLowerCase();
  if (tags) req.body.tags = tags.map((tag) => tag.toLowerCase());
  if (companies) req.body.companies = companies.map((tag) => tag.toLowerCase());

  next();
});
