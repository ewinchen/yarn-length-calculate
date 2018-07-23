const CalculationService = require('../../service/CalculationService')

async function addNewRules(req, res, next) {
  const machineModel = req.body.machineModel;
  const machineType = Number(req.body.machineType);
  const needleQty = Number(req.body.needleQty);
  const gear = req.body.gear;
  const yarnLength = Number(req.body.yarnLength);
  const degree = Number(req.body.degree);


  if (Number.isNaN(needleQty) || Number.isNaN(yarnLength) || Number.isNaN(degree)) {
    res.status(400);
    return res.json({
      type: false,
      message: '不合法的数据'
    })
  }

  try {
    const data = await CalculationService.addNewRules({
      machineModel,
      machineType,
      needleQty,
      gear,
      yarnLength,
      degree
    })
    res.json({ type: true, data: data })

  } catch (error) {
    next(error)
  }

}

async function listMachineModel(req, res, next) {
  const data = await CalculationService.listMachineModel();
  res.json({ type: true, data })
}

async function encapRules(req, res, next) {

  try {
    const data = await CalculationService.encapRules();
    res.json({ c: 1, d: data })
  } catch (error) {
    res.json({ c: 0, e: error })
  }

}

async function checkUpdate(req, res, next) {
  try {
    const inVersion = Number(req.params.version);
    const checkResult = await CalculationService.checkUpdate(inVersion)
    res.json({ r: checkResult, m: { t: { 1: '单面机', 2: '双面机' } } })
  } catch (error) {
    next(error)
  }

}

async function listRulesByMachineModel(req, res, next) {
  try {
    const machineModel = req.params.machineModel;
    const data = await CalculationService.listRulesByMachineModel(machineModel);
    res.json({ type: true, data: data })
  } catch (error) {
    next(error)
  }
}

async function updateCoefficient(req, res, next) {
  try {

    const body = req.body;
    const data = await CalculationService.updateCoefficient(body);
    res.json({ type: true, data: data });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addNewRules,
  listMachineModel,
  encapRules,
  checkUpdate,
  listRulesByMachineModel,
  updateCoefficient
}