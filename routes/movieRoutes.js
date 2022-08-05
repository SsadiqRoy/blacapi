const { Router } = require("express");

const controller = require("../controllers/moviesController");
const { aboveUser } = require("../middlewares/protectMiddleware");
const { protect } = require("../middlewares/globalMiddleware");

const router = Router();

//

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.get("/search/:text", controller.search);

router.use(protect, aboveUser);
router.post("/create", controller.createMovie);

const { updateMovie, deleteMovie } = controller;
router.route("/:id").patch(updateMovie).delete(deleteMovie);
//
module.exports = router;
