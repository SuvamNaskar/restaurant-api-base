const express = require('express');
const router = express.Router();
const tableController = require('../controllers/Table');

router.get('/', tableController.getTables);

router.get('/number/:number', tableController.getTableByNumber);

router.post('/', tableController.postTable);

router.patch('/number/:number', tableController.updateTableByNumber);

router.delete('/', tableController.deleteTableByNumber);

module.exports = router;