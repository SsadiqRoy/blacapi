const { Router } = require("express");

const controller = require("../controllers/suggestionsController");

const router = Router();

//

router.route("/").post(controller.addSuggestion).get(controller.allSuggestions);
const { oneSuggestion, updateSuggestion, deleteSuggestion } = controller;
router
  .route("/:id")
  .get(oneSuggestion)
  .patch(updateSuggestion)
  .delete(deleteSuggestion);

//
module.exports = router;
