const { Router } = require("express");

const controller = require("../controllers/problemsController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//

router.post("/create", controller.addProblem);

router.use(protect, aboveUser);
router.get("/", controller.allProblems);
const { oneProblem, updateProblem, deleteProblem } = controller;
router.route("/:id").get(oneProblem).patch(updateProblem).delete(deleteProblem);

//
module.exports = router;
