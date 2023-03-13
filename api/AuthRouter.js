const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const validator = require('../utils/Validation');
const auth = require('../middleware/AuthMiddleware');

router.post(
    '/register',
    [
        validator.reqStringValidator('country'),
        validator.reqStringValidator('businessName'),
        validator.reqNumberValidator('businessType'),
        validator.reqNumberValidator('district'),
        validator.reqStringValidator('ownerName'),
        validator.reqNumberValidator('phone'),
        validator.reqStringValidator('email'),
        validator.reqNumberValidator('pin'),
    ],
    AuthController.register
)

router.post(
    '/login',
    [
        validator.reqStringValidator('email'),
        validator.reqStringValidator('password'),
    ],
    AuthController.login
)
router.get(
    '/my-account',
    auth,
    AuthController.account
)

module.exports = router;