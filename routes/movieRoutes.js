const { Router } = require("express");

const controller = require("../controllers/moviesController");

const router = Router();

//

router.route("/").post(controller.createMovie).get(controller.getAll);
const { getOne, updateMovie, deleteMovie } = controller;
router.route("/:id").get(getOne).patch(updateMovie).delete(deleteMovie);

//
module.exports = router;
