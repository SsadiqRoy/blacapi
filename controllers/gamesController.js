const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
const Game = require("../model/games");
// const { catchAsync } = require("../utils/utils");

//

//

exports.addGame = create(Game);
exports.updateGame = update(Game);
exports.deleteGame = deleteOne(Game);
exports.allGames = getAll(Game);
exports.oneGame = getOne(Game, ["User", "Links", "Screenshots"]);
