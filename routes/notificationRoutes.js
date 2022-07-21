const { Router } = require("express");

const controller = require("../controllers/notificationsController");

const router = Router();

//

router
  .route("/")
  .post(controller.addNotification)
  .get(controller.allNotifications);
const { oneNotification, updateNotification, deleteNotification } = controller;
router
  .route("/:id")
  .get(oneNotification)
  .patch(updateNotification)
  .delete(deleteNotification);

//
module.exports = router;
