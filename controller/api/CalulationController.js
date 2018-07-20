const CalculationService = require('../../service/CalculationService')

async function addNewRules(req, res, next) {
  const machineModel = req.body.machineModel;
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
  const inVersion = Number(req.params.version);
  const r = await CalculationService.checkUpdate(inVersion)
  res.json(r)
}

module.exports = {
  addNewRules,
  listMachineModel,
  encapRules,
  checkUpdate
}