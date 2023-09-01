const express = require('express');
const router = express.Router();

// Import and mount individual route files
const roomRoutes = require('./roomRoutes');
const codeRoutes = require('./codeRoutes');

// Mount the individual route files
router.use('/', roomRoutes);
router.use('/', codeRoutes);

module.exports = router;
