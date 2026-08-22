const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Article = require('../models/Article');

// create default admin and sample articles
const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  let admin = await User.findOne({ email: email.toLowerCase() });
  if (!admin) {
    const hashed = await bcrypt.hash(password, 10);
    admin = await User.create({ email, password: hashed, role: 'admin' });
    console.log('Admin user created');
  }

  const count = await Article.countDocuments();
  if (count === 0) {
    await Article.insertMany([
      {
        title: 'AI Tools Are Changing How We Work',
        content:
          'Artificial intelligence is now part of everyday software. From writing assistants to code helpers, teams are getting more done in less time.',
        category: 'AI',
      },
      {
        title: 'React 19 Brings Faster UI Updates',
        content:
          'The latest React release improves rendering speed and simplifies common patterns for building modern web apps.',
        category: 'Web',
      },
      {
        title: 'MongoDB Atlas Makes Cloud DB Easy',
        content:
          'Developers can spin up a managed database in minutes and scale as their app grows without managing servers.',
        category: 'Database',
      },
    ]);
    console.log('Sample articles added');
  }
};

module.exports = seedAdmin;
