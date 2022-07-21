const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
const Season = require("../model/seasons");
// const { catchAsync } = require("../utils/utils");

//

exports.addSeason = create(Season);
exports.updateSeason = update(Season);
exports.deleteSeason = deleteOne(Season);
exports.allSeasons = getAll(Season);
exports.oneSeason = getOne(Season, ["Episodes"]);

//
