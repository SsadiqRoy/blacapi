const { Router } = require("express");

const controller = require("../controllers/userController");

const router = Router();

//

router.route("/").post(controller.createUser).get(controller.allUsers);
const { oneUser, updateUser, deleteUser } = controller;
router.route("/:id").get(oneUser).patch(updateUser).delete(deleteUser);

//
module.exports = router;
