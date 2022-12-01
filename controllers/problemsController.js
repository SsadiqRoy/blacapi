const { create, deleteOne, update, getAll, getOne } = require('../middlewares/globalMiddleware');
const Problem = require('../model/problems');

//

//

exports.addProblem = create(Problem);
exports.updateProblem = update(Problem);
exports.deleteProblem = deleteOne(Problem);
exports.allProblems = getAll(Problem);
exports.oneProblem = getOne(Problem);
//
