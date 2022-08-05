const { Router } = require("express");

const controller = require("../controllers/seasonsController");
const { protect } = require("../middlewares/globalMiddleware");
const { aboveUser } = require("../middlewares/protectMiddleware");

const router = Router();

//

router.use(protect, aboveUser);
router.get("/", controller.allSeasons);
router.post("/create", controller.addSeason);
const { oneSeason, updateSeason, deleteSeason } = controller;
router.route("/:id").get(oneSeason).patch(updateSeason).delete(deleteSeason);

//
module.exports = router;
