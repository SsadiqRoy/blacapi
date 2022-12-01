const { create, deleteOne, update, getAll, getOne } = require('../middlewares/globalMiddleware');
const Suggestion = require('../model/suggestions');

//

exports.addSuggestion = create(Suggestion);
exports.updateSuggestion = update(Suggestion);
exports.deleteSuggestion = deleteOne(Suggestion);
exports.allSuggestions = getAll(Suggestion);
exports.oneSuggestion = getOne(Suggestion);
//
