const { Router } = require("express");

const controller = require("../controllers/linksController");

const router = Router();

//

router.route("/").post(controller.createLink).get(controller.allLinks);
const { oneLink, updateLink, deleteLink } = controller;
router.route("/:id").get(oneLink).patch(updateLink).delete(deleteLink);
router.get("/product/:product/:id", controller.productLinks);

//
module.exports = router;
