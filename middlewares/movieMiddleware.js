const { catchAsync } = require("../utils/utils");

exports.beforeCreate = catchAsync(async (req, res, next) => {
  const { company, country, companies } = req.body;
  const { tags, charactors, actors, directors } = req.body;

  req.body.user = req.user.id;
  if (company) req.body.company = req.body.company.toLowerCase();
  if (country) req.body.country = req.body.country.toLowerCase();

  if (tags) req.body.tags = tags.map((tag) => tag.toLowerCase());
  if (companies) req.body.companies = companies.map((tag) => tag.toLowerCase());
  if (charactors) req.body.charactors = actors.map((tag) => tag.toLowerCase());
  if (directors) req.body.directors = directors.map((tag) => tag.toLowerCase());
  if (charactors) req.body.charactors = charactors.map((tag) => tag.toLowerCase());

  next();
});
