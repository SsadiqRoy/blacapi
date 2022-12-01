const Movie = require('../model/movies');

const { create, deleteOne, update, getAll, getOne, search } = require('../middlewares/globalMiddleware');
const { catchAsync } = require('../utils/utils');

//

//

exports.createMovie = create(Movie);
exports.updateMovie = update(Movie);
exports.deleteMovie = deleteOne(Movie);
exports.getAll = getAll(Movie, [
  ['title', 0],
  ['country', 0],
  ['keywords', 1],
  ['companies', 1],
  ['charactors', 1],
]);
exports.getOne = getOne(Movie, ['Links'], [['Links', 'resolution', 'ASC']]);
