const { Router } = require('express');

const controller = require('../controllers/userController');
const { aboveEployee, protect } = require('../middlewares/protectMiddleware');

const router = Router();

//

const { login, logout, signup } = controller;
router.post('/login', login);
router.post('/signup', signup);

router.get('/loggedin', controller.isLoggedIn);
router.use(protect);
router.get('/logout', logout);

const { oneUser, updateUser, deleteUser } = controller;
router.route('/:id').get(oneUser).patch(updateUser).delete(deleteUser);
router.patch('/changepassword/:id', controller.changePassword);

router.use(aboveEployee); // only position above employee are allowed
router.route('/').get(controller.allUsers);

// adding or removing an employee an employee
router.patch('/employee/:id', updateUser);

//
module.exports = router;
