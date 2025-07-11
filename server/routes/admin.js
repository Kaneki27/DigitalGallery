const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');
const Photo = require('../models/Photo');
const adminSdk = require('firebase-admin');
const { authMiddleware } = require('../utils/auth');

// Get all users
router.get('/users', authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get('/events', authMiddleware(['admin']), async (req, res) => {
  try {
    const events = await Event.find().populate('photos');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/users/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete photo
router.delete('/photos/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign admin role (Firebase custom claim)
router.post('/users/:uid/assign-admin', authMiddleware(['admin']), async (req, res) => {
  try {
    await adminSdk.auth().setCustomUserClaims(req.params.uid, { admin: true });
    res.json({ message: 'Admin role assigned' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Promote a user to admin (set role to 'admin')
router.post('/users/:id/promote', authMiddleware(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: 'admin' }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 