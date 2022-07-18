const { Router } = require("express");

const controller = require("../controllers/seriesController");

const router = Router();

//

router.route("/").post(controller.addSerie).get(controller.allSeries);
const { oneSerie, updateSerie, deleteSerie } = controller;
router.route("/:id").get(oneSerie).patch(updateSerie).delete(deleteSerie);

//
module.exports = router;
