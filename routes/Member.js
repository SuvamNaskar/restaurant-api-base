const express = require('express');
const router = express.Router();
const memberController = require('../controllers/Member');

router.get('/', memberController.getMembers);

router.get('/name/:name', memberController.getMemberByName);

router.post('/', memberController.postMembers);

router.patch('/name/:name', memberController.updateMemberByName);

router.delete('/', memberController.deleteMemberByName);

module.exports = router;