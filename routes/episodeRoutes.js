const { Router } = require("express");

const controller = require("../controllers/episodesController");

const router = Router();

//

router.route("/").post(controller.addEpisode).get(controller.allEpisodes);
const { oneEpisode, updateEpisode, deleteEpisode } = controller;
router.route("/:id").get(oneEpisode).patch(updateEpisode).delete(deleteEpisode);

//
module.exports = router;
