const Router = require('express').Router;
const calcModelController = require('../Controllers/calc-model-controller');
const authMiddleware = require('../Middlewares/auth-middleware');

const router = new Router();

router.post('/', authMiddleware, calcModelController.createCalcModel);
router.delete('/', calcModelController.deleteCalcModelById);
router.get('/:savingType', authMiddleware, calcModelController.getCalcModelsListByUser);
router.get('/users', authMiddleware, calcModelController.getCalcUsers);


module.exports = router;