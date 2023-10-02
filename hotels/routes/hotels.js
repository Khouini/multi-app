const express = require('express');
const router = express.Router();
const hotelsController = require('../controllers/hotels');
const authenticationMiddleware = require('../middlewares/authentication');

// Protected route (index) in the /hotels app
router.get('/', authenticationMiddleware.isAuthenticated, hotelsController.index);

module.exports = router;
