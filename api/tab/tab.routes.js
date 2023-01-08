const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const express = require('express');
const { log } = require('../../middlewares/logger.middleware');
const { getTabs, addTab, removeTab } = require('./tab.controller');
const router = express.Router();

router.get('/', log, getTabs);
router.post('/', addTab);
router.delete('/:id', removeTab);

module.exports = router;
