const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  avatar: { type: String },
  department: { type: String },
  notificationPrefs: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 