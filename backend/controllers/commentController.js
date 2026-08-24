const Comment = require('../models/Comment');

// get comments for an item
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ item: req.params.itemId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// add comment
const addComment = async (req, res) => {
  try {
    const { item, name, text } = req.body;

    if (!name?.trim() || !text?.trim()) {
      return res.status(400).json({ message: 'Name and comment are required' });
    }

    const comment = await Comment.create({
      item,
      name: name.trim(),
      text: text.trim(),
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getComments, addComment };
