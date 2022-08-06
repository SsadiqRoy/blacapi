const { Router } = require("express");

const controller = require("../controllers/suggestionsController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//
router.post("/create", controller.addSuggestion);

router.use(protect, aboveUser);
router.get("/", controller.allSuggestions);
const { oneSuggestion, updateSuggestion, deleteSuggestion } = controller;
router
  .route("/:id")
  .get(oneSuggestion)
  .patch(updateSuggestion)
  .delete(deleteSuggestion);

//
module.exports = router;
