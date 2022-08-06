const { Router } = require("express");

const controller = require("../controllers/episodesController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//

router.use(protect, aboveUser);
router.post("/create", controller.addEpisode);
router.get("/", controller.allEpisodes);
const { oneEpisode, updateEpisode, deleteEpisode } = controller;
router.route("/:id").get(oneEpisode).patch(updateEpisode).delete(deleteEpisode);

//
module.exports = router;
