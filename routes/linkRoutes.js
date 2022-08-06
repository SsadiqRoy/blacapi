const { Router } = require("express");

const controller = require("../controllers/linksController");
const { aboveUser, protect } = require("../middlewares/protectMiddleware");

const router = Router();

//
router.get("/getlink/:id", controller.oneLink);

router.use(protect, aboveUser);
router.get("/", controller.allLinks);
router.post("/create", controller.createLink);

const { updateLink, deleteLink } = controller;
router.route("/:id").patch(updateLink).delete(deleteLink);
router.get("/product/:product/:id", controller.productLinks);

//
module.exports = router;
