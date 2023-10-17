const express = require('express');
const router = express.Router();
const cognitoController = require('../auth/cognito');

router.post('/signup', cognitoController.signup);
router.post('/login', cognitoController.login);
router.post('/logout', cognitoController.logout);

module.exports = router;
