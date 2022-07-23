const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
const Notification = require("../model/notifications");
const Problem = require("../model/problems");
const Schedule = require("../model/schedules");
const Suggestion = require("../model/suggestions");
const User = require("../model/user");

//

//

exports.addNotification = create(Notification);
exports.updateNotification = update(Notification);
exports.deleteNotification = deleteOne(Notification);
exports.allNotifications = getAll(Notification);
exports.oneNotification = getOne(Notification, [
  "from",
  "to",
  { model: Problem },
  { model: Suggestion },
  { model: Schedule },
]);
//
