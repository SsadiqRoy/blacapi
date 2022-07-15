const { Router } = require("express");

const controller = require("../controllers/userController");

const router = Router();

//

router.route("/").post(controller.createUser).get(controller.getAll);
const { getOne, updateUser, deleteUser } = controller;
router.route("/:id").get(getOne).patch(updateUser).delete(deleteUser);

//
module.exports = router;
