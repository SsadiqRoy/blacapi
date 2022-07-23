const { Router } = require("express");

const controller = require("../controllers/gamesController");

const router = Router();

//

router.route("/").post(controller.addGame).get(controller.allGames);
const { oneGame, updateGame, deleteGame } = controller;
router.route("/:id").get(oneGame).patch(updateGame).delete(deleteGame);
router.get("/search/:text", controller.search);
//
module.exports = router;
