const { create, deleteOne, update, getAll, getOne, search } = require('../middlewares/globalMiddleware');
const Game = require('../model/games');
// const { catchAsync } = require("../utils/utils");

//

//

exports.addGame = create(Game);
exports.updateGame = update(Game);
exports.deleteGame = deleteOne(Game);
exports.allGames = getAll(Game, [
  ['title', 0],
  ['tags', 1],
  ['companies', 1],
]);
exports.oneGame = getOne(Game, ['User', 'Links'], [['Links', 'part', 'ASC']]);
