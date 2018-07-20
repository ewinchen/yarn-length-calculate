const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calculationRuleVersionSchema = new Schema({
  version: Number,
  updateTimes: Number,
  createAt: { type: Date, default: Date.now() },
})

const CalculationRuleVersion = mongoose.model('calculation_rule_version', calculationRuleVersionSchema);

module.exports = CalculationRuleVersion;