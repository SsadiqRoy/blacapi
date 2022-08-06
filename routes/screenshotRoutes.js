const { Router } = require("express");

const controller = require("../controllers/screenshotsController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//

router.use(protect, aboveUser);
router.post("/", controller.addScreenshot);
router.get("/create", controller.allScreenshots);
const { oneScreenshot, updateScreenshot, deleteScreenshot } = controller;
router
  .route("/:id")
  .get(oneScreenshot)
  .patch(updateScreenshot)
  .delete(deleteScreenshot);
router.get("/product/:product/:id", controller.productsScreenshots);

//
module.exports = router;
