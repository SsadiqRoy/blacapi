const { Router } = require("express");

const controller = require("../controllers/notificationsController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//
router.use(protect, aboveUser);
router.route("/").get(controller.allNotifications);
router.post("/create", controller.addNotification);

const { oneNotification, updateNotification, deleteNotification } = controller;
router
  .route("/:id")
  .get(oneNotification)
  .patch(updateNotification)
  .delete(deleteNotification);

//
module.exports = router;
