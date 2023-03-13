const express = require('express');
const router = express.Router();
const ConstantsController = require('../controllers/ConstantController');
const validator = require('../utils/Validation');
const auth = require('../middleware/AuthMiddleware');

router.post(
    '/set-constants',
    [
        validator.reqStringValidator('key'),
        validator.reqStringValidator('value'),
        validator.reqStringValidator('type'),
        
    ],
    ConstantsController.setConstants
)


module.exports = router;