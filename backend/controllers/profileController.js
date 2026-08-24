const User = require('../models/User');

// get admin profile by id (public)
const getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name image designation about');
    if (!user) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// get logged in admin profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// update admin profile
const updateProfile = async (req, res) => {
  try {
    const { name, image, designation, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, image, designation, about },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getProfile, getProfileById, updateProfile };
