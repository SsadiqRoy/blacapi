const { createInstance } = require("../middlewares/globalMiddleware");
const Serie = require("../model/Series");
const { catchAsync } = require("../utils/utils");

//

//

exports.addSerie = catchAsync(async (req, res, next) => {
  const serie = await createInstance(Serie, req.body);

  res.status(200).json({
    status: "success",
    data: serie,
  });
});

//

exports.updateSerie = catchAsync(async (req, res, next) => {
  const serie = await Serie.update(req.body, { where: { id: req.params.id } });
  const data = await Serie.findByPk(req.params.id);

  res.status(201).json({
    status: "success",
    meta: serie,
    data,
  });
});

//

exports.deleteSerie = catchAsync(async (req, res, next) => {
  const serie = await Serie.destroy({ where: { id: req.params.id } });

  res.status(200).json({
    status: "success",
    data: serie,
  });
});

//

exports.allSeries = catchAsync(async (req, res, next) => {
  const data = await Serie.findAll();

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

//

exports.oneSerie = catchAsync(async (req, res, next) => {
  const data = await Serie.findByPk(req.params.id, {
    include: ["User", "Seasons", "Screenshots"],
  });

  res.status(200).json({
    status: "success",
    data,
  });
});
