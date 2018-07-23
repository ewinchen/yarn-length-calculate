const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calculationRuleSchema = new Schema({
  machineModel: String,     // 机型
  machineType: Number,      // 单面机1，双面机2
  needleQty: Number,        // 针数
  gear: String,             // 齿轮
  coefficient: Number,      // 系数
  isSample: Boolean,        // 是否样本
  isEdited: Boolean,        // 是否手动修改过
  yarnLength: Number,       // 样本纱长
  degree: Number,           // 样本系数
  createAt: { type: Date, default: Date.now() },
})

const CalculationRule = mongoose.model('calculation_rule', calculationRuleSchema);

module.exports = CalculationRule;