const util = require('util');
const _ = require('lodash')
const logger = require('../../helper/logger')
const GeneralService = require('../../service/GeneralService')

class GeneralController {

  static async list(req, res, next) {
    let modelName = req.params.modelName;
    let pageNum = req.query.pageNum || 1;
    let pageSize = req.query.pageSize || 20;
    let isTotal = req.query.isTotal == 1 ? true : false;

    pageNum = Number(pageNum);
    pageSize = Number(pageSize);

    if (!Number.isInteger(pageNum) || !Number.isInteger(pageSize) || pageSize < -1 || pageSize === 0) {
      return res.status(400).send({ type: false, message: 'Invalid Page Arguments' });
    }

    try {
      var generalService = new GeneralService(modelName);
    } catch (err) {
      return res.status(400).send({ type: false, message: 'Invalid Model Name' });
    }

    try {
      let result = await generalService.list(pageNum, pageSize, isTotal)
      res.send({ type: true, ...result })
    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    let modelName = req.params.modelName;
    let inData = req.body;
    logger.debug('Income Data', inData);
    if (Object.keys(inData).length === 0) {
      res.status(400);
      res.send({
        type: false,
        message: '数据不能为空'
      })
      return;
    }
    try {
      var generalService = new GeneralService(modelName);
    } catch (err) {
      res.status(400);
      res.send({ type: false, message: 'Invalid Model Name' })
      return;
    }
    try {
      let data = await generalService.create(inData)
      res.send({
        type: true,
        data: data
      })
    } catch (error) {
      next(error)
    }
  }

  static async show(req, res, next) {
    let modelName = req.params.modelName;
    let id = req.params.id;
    try {
      var generalService = new GeneralService(modelName);
    } catch (err) {
      res.status(400);
      res.send({ type: false, message: 'Invalid Model Name' })
      return;
    }
    try {
      let data = await generalService.show(id)
      if (data) {
        res.send({
          type: true,
          data: data
        })
      } else {
        res.status(404);
        res.send({
          type: false,
          message: 'Data Not Found'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    let modelName = req.params.modelName;
    let id = req.params.id;
    let inData = req.body;

    if (Object.keys(inData).length === 0) {
      res.status(400);
      res.send({
        type: false,
        message: '数据不能为空'
      })
    }
    try {
      var generalService = new GeneralService(modelName);
    } catch (err) {
      res.status(400);
      res.send({ type: false, message: 'Invalid Model Name' })
      return;
    }
    try {
      let data = await generalService.update(id, inData)
      res.send({
        type: true,
        data: data
      })
    } catch (error) {
      next(error)
    }
  }

  static async listBy(req, res, next) {
    let modelName = req.params.modelName;
    let filter = req.body;
    let pageNum = req.query.pageNum || 1;
    let pageSize = req.query.pageSize || 20;
    let isTotal = req.query.isTotal == 1 ? true : false;

    pageNum = Number(pageNum);
    pageSize = Number(pageSize);

    if (!Number.isInteger(pageNum) || !Number.isInteger(pageSize) || pageSize < -1 || pageSize === 0) {
      return res.status(400).send({ type: false, message: 'Invalid Page Arguments' });
    }

    try {
      var generalService = new GeneralService(modelName);
    } catch (err) {
      return res.status(400).send({ type: false, message: 'Invalid Model Name' });
    }

    try {
      let result = await generalService.listBy(filter, pageNum, pageSize, isTotal)
      res.send({ type: true, ...result })
    } catch (err) {
      next(err)
    }
  }

  static async showBy(req, res, next) {
    let modelName = req.params.modelName;
    let conditions = req.body;
    if (_.isEmpty(conditions)) {
      res.status(400);
      res.send({ type: false, message: 'Need Conditions' });
      return;
    }
    try {
      var generalService = new GeneralService(modelName);
    } catch (err) {
      res.status(400);
      res.send({ type: false, message: 'Model Not Found' })
      return;
    }
    try {
      let data = await generalService.showBy(conditions)
      res.send({ type: true, data: data })
    } catch (error) {
      next(error);
    }
  }

  static async updateBy(req, res, next) {
    let modelName = req.params.modelName;
    let updateObject = req.body;

    try {
      var generalService = new GeneralService(modelName);
    } catch (err) {
      res.status(400);
      res.json({ type: false, message: 'Invalid Model Name' })
      return;
    }
    try {
      let data = await generalService.updateBy(updateObject);
      res.json({ type: true, data: data })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GeneralController;