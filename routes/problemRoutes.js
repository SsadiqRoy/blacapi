const { Router } = require("express");

const controller = require("../controllers/problemsController");

const router = Router();

//

router.route("/").post(controller.addProblem).get(controller.allProblems);
const { oneProblem, updateProblem, deleteProblem } = controller;
router.route("/:id").get(oneProblem).patch(updateProblem).delete(deleteProblem);

//
module.exports = router;
