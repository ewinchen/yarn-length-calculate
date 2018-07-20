const CalculationRule = require('../dao/model/CalculationRule');

const config = require('../config/config.default');

function addNewRules(data) {
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

  return CalculationRule.create(pendingData);

}

function listMachineModel() {
  return CalculationRule.distinct('machineModel');
}

module.exports = {
  addNewRules,
  listMachineModel
}