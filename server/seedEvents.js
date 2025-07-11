process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

console.log('Starting seedEvents.js...');
const mongoose = require('mongoose');
console.log('Loaded mongoose');
const Event = require('./models/Event');
console.log('Loaded Event model');
const User = require('./models/User');
console.log('Loaded User model');
const path = require('path');
const dotenv = require('dotenv');
console.log('Loaded path and dotenv');

// Try loading .env from server directory, then from project root
const envPathServer = path.join(__dirname, '.env');
const envPathRoot = path.join(__dirname, '..', '.env');
if (!dotenv.config({ path: envPathServer }).parsed) {
  console.log('No .env in server, trying root');
  dotenv.config({ path: envPathRoot });
}
console.log('Loaded .env');

// Connect to MongoDB
console.log('Connecting to MongoDB:', process.env.MONGO_URI || 'mongodb://localhost:27017/rejoice2');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rejoice2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const sampleEvents = [
  {
    title: 'Annual Company Day 2024',
    description: 'Our biggest celebration of the year with all employees coming together for fun activities, awards, and memorable moments.',
    date: new Date('2024-12-15'),
    coverImage: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    title: 'Team Building Adventure',
    description: 'Outdoor adventure activities designed to strengthen team bonds and create lasting memories.',
    date: new Date('2024-12-10'),
    coverImage: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    title: 'Holiday Celebration',
    description: 'End of year holiday party with festive decorations, delicious food, and joyful celebrations.',
    date: new Date('2024-12-20'),
    coverImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    title: 'Engineering Hackathon',
    description: '48-hour coding marathon where our developers showcase their creativity and technical skills.',
    date: new Date('2024-11-28'),
    coverImage: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    title: 'Marketing Campaign Launch',
    description: 'Celebrating the successful launch of our latest marketing campaign with the entire marketing team.',
    date: new Date('2024-11-15'),
    coverImage: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    title: 'Wellness Week',
    description: 'A week dedicated to employee wellness with yoga sessions, health talks, and mindfulness activities.',
    date: new Date('2024-11-05'),
    coverImage: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
];

async function seedEvents() {
  try {
    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Create a default admin user if it doesn't exist
    let adminUser = await User.findOne({ email: 'admin@company.com' });
    if (!adminUser) {
      adminUser = await User.create({
        firebaseUid: 'admin-uid',
        email: 'admin@company.com',
        name: 'Admin User',
        role: 'admin',
      });
      console.log('Created admin user');
    }

    // Create events with the admin user as creator
    const eventsWithCreator = sampleEvents.map(event => ({
      ...event,
      createdBy: adminUser._id,
    }));

    const createdEvents = await Event.insertMany(eventsWithCreator);
    console.log(`Created ${createdEvents.length} events:`);
    createdEvents.forEach(event => {
      console.log(`- ${event.title}`);
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedEvents(); 