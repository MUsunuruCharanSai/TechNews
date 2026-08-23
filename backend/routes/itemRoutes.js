const express = require('express');
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
