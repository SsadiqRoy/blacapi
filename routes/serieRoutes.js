const { Router } = require("express");

const controller = require("../controllers/seriesController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//

router.get("/", controller.allSeries);
router.get("/search/:text", controller.search);
router.get("/:id", controller.oneSerie);

router.use(protect, aboveUser);
const { updateSerie, deleteSerie } = controller;
router.route("/create").post(controller.addSerie);
router.route("/:id").patch(updateSerie).delete(deleteSerie);
//
module.exports = router;
