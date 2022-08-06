const { Router } = require("express");

const controller = require("../controllers/moviesController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");
const { beforeCreate } = require("../middlewares/movieMiddleware");

const router = Router();

//

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.get("/search/:text", controller.search);

router.use(protect, aboveUser);
router.post("/create", beforeCreate, controller.createMovie);

const { updateMovie, deleteMovie } = controller;
router.route("/:id").patch(updateMovie).delete(deleteMovie);
//
module.exports = router;
