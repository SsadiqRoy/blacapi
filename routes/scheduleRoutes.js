const { Router } = require("express");

const controller = require("../controllers/schedulesController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//
router.use(protect, aboveUser);
router.get("/", controller.allSchedules);
router.post("/create", controller.addSchedule);
const { oneSchedule, updateSchedule, deleteSchedule } = controller;
router
  .route("/:id")
  .get(oneSchedule)
  .patch(updateSchedule)
  .delete(deleteSchedule);

//
module.exports = router;
