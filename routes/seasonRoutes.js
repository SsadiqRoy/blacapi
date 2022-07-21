const { Router } = require("express");

const controller = require("../controllers/seasonsController");

const router = Router();

//

router.route("/").post(controller.addSeason).get(controller.allSeasons);
const { oneSeason, updateSeason, deleteSeason } = controller;
router.route("/:id").get(oneSeason).patch(updateSeason).delete(deleteSeason);

//
module.exports = router;
