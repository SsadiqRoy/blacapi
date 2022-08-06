const { Router } = require("express");

const controller = require("../controllers/gamesController");
const { beforeCreate } = require("../middlewares/gameMiddleware");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//

router.get("/", controller.allGames);
router.route("/:id").get(controller.oneGame);
router.get("/search/:text", controller.search);

router.use(protect, aboveUser);
router.route("/create").post(beforeCreate, controller.addGame);
const { updateGame, deleteGame } = controller;
router.route("/:id").patch(updateGame).delete(deleteGame);
//
module.exports = router;
