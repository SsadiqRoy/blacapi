const { Router } = require("express");

const controller = require("../controllers/othersController");
const { aboveAdmin, protect } = require("../middlewares/protectMiddleware");

const router = Router();

router.use(protect);
router.patch("/changerole/:id", aboveAdmin, controller.changeRole);

module.exports = router;
