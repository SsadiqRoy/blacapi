const { createInstance } = require("../middlewares/globalMiddleware");
const Link = require("../model/links");
const { catchAsync } = require("../utils/utils");

//

//

exports.createLink = catchAsync(async (req, res, next) => {
  const link = await createInstance(Link, req.body);

  res.status(200).json({
    status: "success",
    data: link,
  });
});

//

exports.updateLink = catchAsync(async (req, res, next) => {
  const link = await Link.update({ where: { id: req.params.id } });

  res.status(200).json({
    status: "success",
    data: link,
  });
});

//

exports.deleteLink = catchAsync(async (req, res, next) => {
  const link = await Link.destroy({ where: { id: req.params.id } });

  res.status(200).json({
    status: "success",
    data: link,
  });
});

//

exports.allLinks = catchAsync(async (req, res, next) => {
  const data = await Link.findAll();

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

//

exports.oneLink = catchAsync(async (req, res, next) => {
  const link = await Link.findByPk(req.params.id, { include: "Movie" });

  res.status(200).json({
    status: "success",
    data: link,
  });
});

//

exports.productLinks = catchAsync(async (req, res, next) => {
  let product = req.params.product;
  let links;
  if (product === "movie") {
    links = await Link.findAll({ where: { movie: req.params.id } });
  }
  if (product === "episode") {
    links = await Link.findAll({ where: { episode: req.params.id } });
  }
  if (product === "game") {
    links = await Link.findAll({ where: { game: req.params.id } });
  }

  res.status(200).json({
    status: "success",
    length: links.length,
    data: links,
  });
});
