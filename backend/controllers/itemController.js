const Item = require('../models/Item');

// get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// get single item
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('category', 'name');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// create item
const createItem = async (req, res) => {
  try {
    const { name, mainImage, additionalImages, description, category } = req.body;

    const item = await Item.create({
      name,
      mainImage,
      additionalImages: additionalImages || [],
      description,
      category,
    });

    const savedItem = await Item.findById(item._id).populate('category', 'name');
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// update item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('category', 'name');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
