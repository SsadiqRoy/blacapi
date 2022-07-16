const Movie = require("../model/movies");

const { createInstance } = require("../middlewares/globalMiddleware");
const { catchAsync } = require("../utils/utils");

//

//

exports.createMovie = catchAsync(async (req, res, next) => {
  const movie = await createInstance(Movie, req.body);

  res.status(201).json({
    status: "success",
    data: movie,
  });
});

//

exports.updateMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.update(req.body, { where: { id: req.params.id } });

  res.status(204).json({
    status: "success",
    data: movie,
  });
});

//

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const data = await Movie.destroy({ where: { id: req.params.id } });

  res.status(200).json({
    status: "success",
    message: "movie deleted",
    data,
  });
});

//

exports.getAll = catchAsync(async (req, res, next) => {
  const data = await Movie.findAll({ individualHooks: true });

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

//

exports.getOne = catchAsync(async (req, res, next) => {
  const data = await Movie.findByPk(req.params.id, {
    include: ["User", "Links"],
  });

  res.status(200).json({
    status: "success",
    data,
  });
});
