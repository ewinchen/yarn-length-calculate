const CalculationRule = require('../dao/model/CalculationRule');
const CalculationRuleVersion = require('../dao/model/CalculationRuleVersion');
const uuid = require('uuid/v4');

const config = require('../config/config.default');

async function addNewRules(data) {
  const machineModel = data.machineModel;
  const needleQtySample = data.needleQty;
  const gearSample = data.gear;
  const gearRatioSample = config.gearList.find(item => item.name === data.gear).ratio;
  const coefficientSample = (data.degree / data.yarnLength).toFixed(6);
  const yarnLengthSample = data.yarnLength;
  const degreeSample = data.degree;

  const needleQtyList = config.needleQtyList;
  const gearList = config.gearList;

  const pendingData = [];
  needleQtyList.forEach(needleQty => {
    gearList.forEach(gear => {
      const isSampleCurrent = (needleQty === needleQtySample && gear.name === gearSample) ? true : false;
      const needleQtyCurrent = needleQty;
      const gearCurrent = gear.name;
      const gearRatioCurrent = gear.ratio;
      const coefficientCurrent = ((needleQtySample / needleQtyCurrent) * (gearRatioSample / gearRatioCurrent) * coefficientSample).toFixed(6)

      pendingData.push({
        machineModel: machineModel,                                  // 机型
        needleQty: needleQtyCurrent,                                 // 针数
        gear: gearCurrent,                                           // 齿轮
        coefficient: coefficientCurrent,                             // 系数
        isSample: isSampleCurrent,                                   // 是否样本
        yarnLength: isSampleCurrent ? yarnLengthSample : undefined,  // 样本纱长
        degree: isSampleCurrent ? degreeSample : undefined,          // 样本系数
      })
    })
  })

  const versionDoc = await CalculationRuleVersion.findOne();

  if (versionDoc) {
    return Promise.all([
      CalculationRuleVersion.findOneAndUpdate({}, { updateTimes: versionDoc.updateTimes + 1, version: new Date().getTime() }),
      CalculationRule.create(pendingData)
    ])
  } else {
    return Promise.all([
      CalculationRuleVersion.create({ updateTimes: 1, version: new Date().getTime() }),
      CalculationRule.create(pendingData)
    ])
  }

}

function listMachineModel() {
  return CalculationRule.distinct('machineModel');
}

async function encapRules() {
  const listDoc = await CalculationRule.find({}, { _id: 0, machineModel: 1, needleQty: 1, gear: 1, coefficient: 1 })
  const versionDoc = await CalculationRuleVersion.findOne();

  const list = listDoc.map(item => {
    return {
      m: item.machineModel,
      n: item.needleQty,
      g: item.gear,
      c: item.coefficient
    }
  })

  return {
    l: list,
    v: versionDoc ? versionDoc.version : ''
  }
}

async function checkUpdate(inVersion) {
  const versionDoc = await CalculationRuleVersion.findOne();
  if (versionDoc && versionDoc.version !== inVersion) {
    return 1;
  }
  return 0;
}

module.exports = {
  addNewRules,
  listMachineModel,
  encapRules,
  checkUpdate
}