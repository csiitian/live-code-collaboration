const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/create', roomController.create);
router.post('/join', roomController.join);

module.exports = router;
