const express = require('express');
const { getComments, addComment } = require('../controllers/commentController');

const router = express.Router();

router.get('/item/:itemId', getComments);
router.post('/', addComment);

module.exports = router;
