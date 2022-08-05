const { Router } = require("express");

const controller = require("../controllers/othersController");
const { protect } = require("../middlewares/globalMiddleware");
const { aboveEployee, aboveUser } = require("../middlewares/protectMiddleware");

const router = Router();

module.exports = router;
