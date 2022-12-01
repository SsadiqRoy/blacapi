const { create, deleteOne, update, getAll, getOne } = require('../middlewares/globalMiddleware');
const Season = require('../model/seasons');
const Episode = require('../model/episodes');
const Link = require('../model/links');

// const { catchAsync } = require("../utils/utils");

//

exports.addSeason = create(Season);
exports.updateSeason = update(Season);
exports.deleteSeason = deleteOne(Season);
exports.allSeasons = getAll(Season);
exports.oneSeason = getOne(Season, { model: Episode, include: { model: Link } }, [
  ['Episodes', 'episode', 'ASC'],
  [{ model: 'Episode.Link' }, 'resolution', 'ASC'],
]);

//
