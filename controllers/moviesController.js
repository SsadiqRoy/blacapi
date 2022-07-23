const Movie = require("../model/movies");

const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
  search,
} = require("../middlewares/globalMiddleware");
const { catchAsync } = require("../utils/utils");

//

//

exports.createMovie = create(Movie);
exports.updateMovie = update(Movie);
exports.deleteMovie = deleteOne(Movie);
exports.getAll = getAll(Movie);
exports.getOne = getOne(Movie, ["User", "Links", "Screenshots"]);
exports.search = search(Movie, [
  ["title", 0],
  ["country", 0],
  ["tags", 1],
  ["companies", 1],
  ["characters", 1],
  ["actors", 1],
]);
