const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
const Episode = require("../model/episodes");
// const { catchAsync } = require("../utils/utils");

//

exports.addEpisode = create(Episode);
exports.updateEpisode = update(Episode);
exports.deleteEpisode = deleteOne(Episode);
exports.allEpisodes = getAll(Episode);
exports.oneEpisode = getOne(Episode, ["Links"]);

//
