const { Router } = require("express");

const controller = require("../controllers/notificationsController");
const { protect } = require("../middlewares/globalMiddleware");
const { aboveUser } = require("../middlewares/protectMiddleware");

const router = Router();

//
router.use(protect, aboveUser);
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
