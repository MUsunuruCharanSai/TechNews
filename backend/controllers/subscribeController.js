const Subscriber = require('../models/Subscriber');

// subscribe email
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const exists = await Subscriber.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    await Subscriber.create({ email: email.trim() });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { subscribe };
