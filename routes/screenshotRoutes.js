const { Router } = require("express");

const controller = require("../controllers/screenshotsController");

const router = Router();

//

router.route("/").post(controller.addScreenshot).get(controller.allScreenshots);
const { oneScreenshot, updateScreenshot, deleteScreenshot } = controller;
router
  .route("/:id")
  .get(oneScreenshot)
  .patch(updateScreenshot)
  .delete(deleteScreenshot);
router.get("/product/:product/:id", controller.productsScreenshots);

//
module.exports = router;
