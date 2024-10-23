const express = require('express');
const router = express.Router();
const memberController = require('../controllers/Member');

router.get('/', memberController.getMembers);

router.get('/:name', memberController.getMemberByName);

router.post('/create', memberController.postMembers);

router.patch('/update/:name', memberController.updateMemberByName);

router.delete('/', memberController.deleteMemberByName);

module.exports = router;