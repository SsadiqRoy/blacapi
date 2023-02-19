const { catchAsync } = require("../utils/utils");

exports.beforeCreate = catchAsync(async (req, res, next) => {
  const { company, country, companies, keywords } = req.body;
  const { tags, charactors } = req.body;

  req.body.user = req.user.id;
  if (company) req.body.company = req.body.company.toLowerCase();
  if (country) req.body.country = req.body.country.toLowerCase();

  if (companies) req.body.companies = companies.map((tag) => tag.toLowerCase().replaceAll(" ", "-"));
  if (charactors) req.body.charactors = charactors.map((tag) => tag.toLowerCase().replaceAll(" ", "-"));
  if (keywords) req.body.keywords = keywords.map((tag) => tag.toLowerCase().replaceAll(" ", "-"));

  next();
});
