const { Router } = require("express");

const controller = require("../controllers/linksController");
const { protect } = require("../middlewares/globalMiddleware");
const { aboveUser } = require("../middlewares/protectMiddleware");

const router = Router();

//
router.get("/getlink/:id", controller.oneLink);

router.use(protect, aboveUser);
router.route("/").post(controller.createLink).get(controller.allLinks);
const { oneLink, updateLink, deleteLink } = controller;
router.route("/:id").patch(updateLink).delete(deleteLink);
router.get("/product/:product/:id", controller.productLinks);

//
module.exports = router;
