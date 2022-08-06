const { create, deleteOne, update, getAll, getOne, search } = require("../middlewares/globalMiddleware");
const Serie = require("../model/Series");
const Season = require("../model/seasons");
const Episode = require("../model/episodes");
const Link = require("../model/links");

//

//

exports.addSerie = create(Serie);
exports.updateSerie = update(Serie);
exports.deleteSerie = deleteOne(Serie);
exports.allSeries = getAll(Serie);
exports.oneSerie = getOne(Serie, [
  "User",
  "Screenshots",
  { model: Season, include: { model: Episode, include: Link } },
]);
exports.search = search(Serie, [
  ["title", 0],
  ["country", 0],
  ["tags", 1],
  ["companies", 1],
  ["charactors", 1],
  ["actors", 1],
]);
