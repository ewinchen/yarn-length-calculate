const assert = require('chai').assert;
const User = require('../../../dao/model/User');
const db = require('../../../dao/db/conn');

describe('User mode', function () {
  before(async function () {
    await db.connectDB()
  })
  after(async function () {
    await db.disconnnectDB()
  })

  it('should return User list', async function () {
    let users = await User.find()
    assert.isArray(users)
  })
})