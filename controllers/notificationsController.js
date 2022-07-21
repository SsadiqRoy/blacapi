const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
const Notification = require("../model/notifications");

//

//

exports.addNotification = create(Notification);
exports.updateNotification = update(Notification);
exports.deleteNotification = deleteOne(Notification);
exports.allNotifications = getAll(Notification);
exports.oneNotification = getOne(Notification);
//
