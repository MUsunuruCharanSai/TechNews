const express = require('express');
const { getProfile, getProfileById, updateProfile } = require('../controllers/profileController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', getProfileById);
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

module.exports = router;
