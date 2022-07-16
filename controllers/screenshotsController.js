const { createInstance } = require("../middlewares/globalMiddleware");
const Screenshot = require("../model/screenshots");
const { catchAsync } = require("../utils/utils");

//

//

exports.addScreenshot = catchAsync(async (req, res, next) => {
  const data = await createInstance(Screenshot, req.body);

  res.status(201).json({
    status: "success",
    data,
  });
});

//

exports.updateScreenshot = catchAsync(async (req, res, next) => {
  const screen = await Screenshot.update(req.body, {
    where: { id: req.params.id },
  });
  const data = await Screenshot.findByPk(req.params.id);

  res.status(200).json({
    status: "success",
    meta: screen,
    data,
  });
});

//

exports.deleteScreenshot = catchAsync(async (req, res, next) => {
  const screen = await Screenshot.destroy({ where: { id: req.params.id } });

  res.status(204).json({
    status: "success",
    meta: screen,
    data: screen,
  });
});

//

exports.allScreenshots = catchAsync(async (req, res, next) => {
  const data = await Screenshot.findAll();

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

//

exports.oneScreenshot = catchAsync(async (req, res, next) => {
  const screen = await Screenshot.findByPk(req.params.id);

  res.status(200).json({
    status: "success",
    data: screen,
  });
});

//

exports.productsScreenshots = catchAsync(async (req, res, next) => {
  let product = req.params.product;
  let data;

  if (product === "movie") {
    data = await Screenshot.findAll({ where: { movie: req.params.id } });
  }

  if (product === "series") {
    data = await Screenshot.findAll({ where: { movie: req.params.id } });
  }

  if (product === "games") {
    data = await Screenshot.findAll({ where: { movie: req.params.id } });
  }

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});
