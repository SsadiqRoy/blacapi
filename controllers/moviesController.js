const Movie = require("../model/movies");

const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
const { catchAsync } = require("../utils/utils");

//

//

exports.createMovie = create(Movie);

//

exports.updateMovie = update(Movie);

//

exports.deleteMovie = deleteOne(Movie);
//

exports.getAll = getAll(Movie);

//

exports.getOne = getOne(Movie, ["User", "Links", "Screenshots"]);
