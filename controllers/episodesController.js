const { create, deleteOne, update, getAll, getOne } = require('../middlewares/globalMiddleware');
const Episode = require('../model/episodes');
const Link = require('../model/links');

//

exports.addEpisode = create(Episode);
exports.updateEpisode = update(Episode);
exports.deleteEpisode = deleteOne(Episode);
exports.allEpisodes = getAll(Episode);
exports.oneEpisode = getOne(Episode, { model: Link }, [['Links', 'resolution', 'ASC']]);

//
