const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

router.post('/code', codeController.setCode);
router.get('/code', codeController.getCode);

module.exports = router;
