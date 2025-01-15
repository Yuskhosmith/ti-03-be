const express = require('express');
const router = express.Router();
const {authenticateJWT} = require('../middlewares/auth.middleware');
const {getUserDetails} = require('../controllers/user.controller');

router.get('/me', authenticateJWT, getUserDetails);

module.exports = router;
