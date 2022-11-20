const { Router } = require('express');

const controller = require('../controllers/userController');
const { aboveEployee, protect } = require('../middlewares/protectMiddleware');

const router = Router();

//

const { login, logout, signup } = controller;
// router.route('/log').post(signup).patch(login);
router.post('/login', login);
router.post('/signup', signup);

router.use(protect);
router.get('/logout', logout);
router.get('/loggedin', controller.isLoggedIn);

const { oneUser, updateUser, deleteUser } = controller;
router.route('/:id').get(oneUser).patch(updateUser).delete(deleteUser);
router.patch('/changepassword/:id', controller.changePassword);

router.use(aboveEployee); // only position above employee are allowed
router.route('/').get(controller.allUsers);
router.get('/search', controller.search);

// adding or removing an employee an employee
router.patch('/employee/:id', updateUser);

//
module.exports = router;
