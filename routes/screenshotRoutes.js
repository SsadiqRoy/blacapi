const { Router } = require("express");

const controller = require("../controllers/screenshotsController");
const { protect } = require("../middlewares/globalMiddleware");
const { aboveUser } = require("../middlewares/protectMiddleware");

const router = Router();

//

router.use(protect, aboveUser);
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
