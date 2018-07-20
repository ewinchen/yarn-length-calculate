const { assert, expect } = require('chai');
const should = require('chai').should();
const { connectDB, disconnnectDB } = require('../../dao/db/conn')
const logger = require('../../helper/logger')
const GeneralService = require('../../service/GeneralService')

describe('GeneralService', async function () {
  let generalService;
  before(async function () {
    await connectDB()
  })

  beforeEach(async function () {
    generalService = null;
    generalService = new GeneralService('User');
  })

  describe('list', function () {
    it('should return user list', async function () {
      let data = await generalService.list();
      assert.isArray(data)
    })
  })

  after(async function () {
    await disconnnectDB()
  })

})