const express = require('express');
const router = express.Router();
const login = require('../controller/site/login')
const admin = require('../controller/site/admin')

/* 管理系统MIS */

router.get('/admin', admin.index);
router.get('/admin/login', login.index);
router.post('/admin/login', login.handleLogin);
router.get('/admin/logout', login.handleLogout);

module.exports = router;