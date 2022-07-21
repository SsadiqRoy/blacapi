const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
const Schedule = require("../model/schedules");

//

//

exports.addSchedule = create(Schedule);
exports.updateSchedule = update(Schedule);
exports.deleteSchedule = deleteOne(Schedule);
exports.allSchedules = getAll(Schedule);
exports.oneSchedule = getOne(Schedule);
//
