const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

// Explicitly load .env from the server directory
dotenv.config({ path: require('path').join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Firebase Admin initialization
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Routes
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const commentsRouter = require('./routes/comments');
const adminRouter = require('./routes/admin');
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/admin', adminRouter);
// TODO: Add events, comments, admin routes

// Catch-all logger for unmatched routes
app.use((req, res, next) => {
  console.log(`[UNMATCHED ROUTE] ${req.method} ${req.originalUrl}`);
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
