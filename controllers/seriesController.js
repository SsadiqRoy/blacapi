const { create, deleteOne, update, getAll, getOne, search } = require('../middlewares/globalMiddleware');
const Serie = require('../model/series');
const Season = require('../model/seasons');
const Episode = require('../model/episodes');

//

//

exports.addSerie = create(Serie);
exports.updateSerie = update(Serie);
exports.deleteSerie = deleteOne(Serie);
exports.allSeries = getAll(Serie, [
  ['title', 0],
  ['status', 0],
  ['country', 0],
  ['keywords', 1],
  ['companies', 1],
  ['charactors', 1],
]);
exports.oneSerie = getOne(Serie, [{ model: Season }], [['Seasons', 'number', 'ASC']]);
exports.basic = getOne(Serie);
