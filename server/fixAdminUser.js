const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
const dotenv = require('dotenv');

// Load .env from server directory or project root
const envPathServer = path.join(__dirname, '.env');
const envPathRoot = path.join(__dirname, '..', '.env');
if (!dotenv.config({ path: envPathServer }).parsed) {
  dotenv.config({ path: envPathRoot });
}

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rejoice2';

async function fixAdmin() {
  console.log('Connecting to MongoDB:', MONGO_URI);
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
  const user = await User.findOne({ email: 'admin@company.com' });
  console.log('User found:', user ? user.email : 'none');
  if (!user) {
    console.log('No user found with email admin@company.com');
    process.exit(1);
  }
  user.role = 'admin';
  await user.save();
  console.log('Updated user to admin:', user.email);
  process.exit(0);
}

fixAdmin().catch(err => {
  console.error('Error updating admin user:', err);
  process.exit(1);
}); 