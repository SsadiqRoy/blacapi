const { Router } = require('express');

const controller = require('../controllers/userController');
const { aboveEployee, protect } = require('../middlewares/protectMiddleware');

const router = Router();

//

const { login, logout, signup } = controller;
router.route('/log').post(signup).patch(login);

router.use(protect);
router.get('/log', logout);
router.get('/loggedin', controller.isLoggedIn);

const { oneUser, updateUser, deleteUser } = controller;
router.route('/:id').get(oneUser).patch(updateUser).delete(deleteUser);

router.use(aboveEployee); // only position above employee are allowed
router.route('/').get(controller.allUsers);
router.get('/search/:text', controller.search);

// adding or removing an employee an employee
router.patch('/employee/:id', updateUser);

//
module.exports = router;
