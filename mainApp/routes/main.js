const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const authenticationMiddleware = require('../middlewares/authentication');

router.get('/',
    authenticationMiddleware.isAuthenticated,
    mainController.index);

module.exports = router;
