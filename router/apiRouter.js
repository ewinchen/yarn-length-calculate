const express = require('express');
const router = express.Router();
const CalulationController = require('../controller/api/CalulationController')

// GeneralController
const GeneralController = require('../controller/api/GeneralController');
// 基本CURD
router.get('/list/:modelName', GeneralController.list);
router.get('/show/:modelName/:id', GeneralController.show);
router.post('/create/:modelName', GeneralController.create);
router.post('/update/:modelName/:id', GeneralController.update);
// 根据条件查询
router.post('/listby/:modelName', GeneralController.listBy);
router.post('/showby/:modelName', GeneralController.showBy);
router.post('/updateby/:modelName', GeneralController.updateBy);

// Custom Api
router.get('/check/:version', CalulationController.checkUpdate);
router.get('/rules', CalulationController.encapRules);
router.post('/add_new_rules', CalulationController.addNewRules);
router.get('/list_machine_model', CalulationController.listMachineModel);
router.get('/list_rules_by_machine_model/:machineModel', CalulationController.listRulesByMachineModel)

module.exports = router;