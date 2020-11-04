const express = require('express');
const splitController = require('../controllers/split-controller');

const router = express.Router();

router.route('/').get(splitController);

module.exports = router;
