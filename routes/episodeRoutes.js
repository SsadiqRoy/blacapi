const { Router } = require("express");

const controller = require("../controllers/episodesController");
const { protect } = require("../middlewares/globalMiddleware");
const { aboveUser } = require("../middlewares/protectMiddleware");

const router = Router();

//

router.use(protect, aboveUser);
router.post("/", controller.addEpisode);
router.get("/create", controller.allEpisodes);
const { oneEpisode, updateEpisode, deleteEpisode } = controller;
router.route("/:id").get(oneEpisode).patch(updateEpisode).delete(deleteEpisode);

//
module.exports = router;
