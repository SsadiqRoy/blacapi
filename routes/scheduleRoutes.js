const { Router } = require("express");

const controller = require("../controllers/schedulesController");
const { protect } = require("../middlewares/globalMiddleware");
const { aboveUser } = require("../middlewares/protectMiddleware");

const router = Router();

//
router.use(protect, aboveUser);
router.route("/").post(controller.addSchedule).get(controller.allSchedules);
const { oneSchedule, updateSchedule, deleteSchedule } = controller;
router
  .route("/:id")
  .get(oneSchedule)
  .patch(updateSchedule)
  .delete(deleteSchedule);

//
module.exports = router;
