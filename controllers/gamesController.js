const { createInstance } = require("../middlewares/globalMiddleware");
const Game = require("../model/games");
const { catchAsync } = require("../utils/utils");

//

//

exports.addGame = catchAsync(async (req, res, next) => {
  const game = await createInstance(Game, req.body);

  res.status(200).json({
    status: "success",
    data: game,
  });
});

//

exports.updateGame = catchAsync(async (req, res, next) => {
  const game = await Game.update(req.body, { where: { id: req.params.id } });
  const data = await Game.findByPk(req.params.id);

  res.status(201).json({
    status: "success",
    meta: game,
    data,
  });
});

//

exports.deleteGame = catchAsync(async (req, res, next) => {
  const game = await Game.destroy({ where: { id: req.params.id } });

  res.status(200).json({
    status: "success",
    data: game,
  });
});

//

exports.allGames = catchAsync(async (req, res, next) => {
  const data = await Game.findAll();

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

//

exports.oneGame = catchAsync(async (req, res, next) => {
  const data = await Game.findByPk(req.params.id, {
    include: ["User", "Links", "Screenshots"],
  });

  res.status(200).json({
    status: "success",
    data,
  });
});
