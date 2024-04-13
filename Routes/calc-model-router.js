const Router = require('express').Router;
const calcModelController = require('../Controllers/calc-model-controller');
const authMiddleware = require('../Middlewares/auth-middleware');

const router = new Router();

router.post('/', authMiddleware, calcModelController.createCalcModel);
router.delete('/', calcModelController.deleteCalcModelById);
router.get('/', authMiddleware, calcModelController.getCalcModelsListByUser);


module.exports = router;