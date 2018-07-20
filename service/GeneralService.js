const mongoose = require('mongoose');

const logger = require('../helper/logger');

require('../dao/model/General');

class GeneralService {
  constructor(modelName) {
    this.model = mongoose.model(modelName);
  }

  async list(pageNum, pageSize, isTotal) {
    let total = isTotal ? await this.model.find().count() : undefined;
    let data;
    if (pageSize === -1) {
      data = await this.model.find().sort({ createAt: -1 })
    } else {
      data = await this.model.find().sort({ createAt: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize)
    }
    return { total, data };
  }

  show(id) {
    return this.model.findById(id);
  }

  create(inData) {
    return this.model.create(inData);
  }

  update(id, inData) {
    return this.model.findByIdAndUpdate(id, inData);
  }

  async listBy(filter, pageNum, pageSize, isTotal) {
    let total = isTotal ? await this.model.find(filter.conditions).count() : undefined;
    let data;
    if (pageSize === -1) {
      data = await this.model.find(filter.conditions).select(filter.projections).sort({ createAt: -1 })
    } else {
      data = await this.model.find(filter.conditions).select(filter.projections).sort({ createAt: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize)
    }
    return { total, data };
  }

  showBy(conditions) {
    return this.model.findOne(conditions)
  }

    /**
   * 传入updateObject,执行mongoose的Model的updatef方法
   * @see http://mongoosejs.com/docs/api.html#update_update
   * @param {any} updateObject 
   * updatateObject.conditions: 查询条件,
   * updateObject.doc: 要更新的数据,
   * updateObject.options: 可设置批量跟新或启用覆盖模式如multi: true, overwrite: true
   * @returns Promise<any>
   * @memberof GeneralService
   */
  updateBy(updateObject) {
    logger.info(`${this.model.modelName} updateBy is called`, updateObject.conditions)
    return this.model.update(updateObject.conditions, updateObject.doc, updateObject.options).exec();
  }
}



module.exports = GeneralService;