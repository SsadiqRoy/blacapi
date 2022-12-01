const { Router } = require('express');

const controller = require('../controllers/seriesController');
const { beforeCreate } = require('../middlewares/movieMiddleware');
const { aboveUser, protect } = require('../middlewares/protectMiddleware');

const router = Router();

//

router.get('/', controller.allSeries);
router.get('/basic/:id', controller.basic);
router.get('/:id', controller.oneSerie);

router.use(protect, aboveUser);
const { updateSerie, deleteSerie } = controller;
router.route('/create').post(beforeCreate, controller.addSerie);
router.route('/:id').patch(beforeCreate, updateSerie).delete(deleteSerie);
//
module.exports = router;
