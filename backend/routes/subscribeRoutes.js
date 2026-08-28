const express = require('express');
const { subscribe } = require('../controllers/subscribeController');

const router = express.Router();

router.post('/', subscribe);

module.exports = router;
