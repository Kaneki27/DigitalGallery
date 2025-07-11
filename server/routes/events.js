const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Event = require('../models/Event');
const Photo = require('../models/Photo');
const { authMiddleware } = require('../utils/auth');

// Set up multer for file uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  },
});
const upload = multer({ storage });

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('photos');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a photo by ID
router.delete('/photos/:photoId', authMiddleware(['admin', 'employee']), async (req, res) => {
  try {
    console.log('DELETE /photos/:photoId called by user:', req.user && req.user.email, 'photoId:', req.params.photoId);
    const photoId = req.params.photoId;
    const photo = await Photo.findByIdAndDelete(photoId);
    console.log('findByIdAndDelete result:', photo);
    if (!photo) {
      console.log('Photo not found:', photoId);
      return res.status(404).json({ error: 'Photo not found' });
    }
    // Remove photo reference from the event
    const eventUpdate = await Event.findByIdAndUpdate(photo.event, { $pull: { photos: photoId } });
    console.log('Event update result:', eventUpdate);
    // Optionally, delete the file from disk
    const filePath = path.join(__dirname, '../uploads', path.basename(photo.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('Deleted file from disk:', filePath);
    } else {
      console.log('File not found on disk:', filePath);
    }
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    console.error('Delete photo error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all pending photos
router.get('/photos/pending', authMiddleware(['admin']), async (req, res) => {
  try {
    const pendingPhotos = await Photo.find({ status: 'pending' })
      .populate('event', 'title')
      .populate('uploadedBy', 'name email');
    res.json(pendingPhotos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: 'photos',
        match: { status: 'approved' },
      });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create event (admin only)
router.post('/', authMiddleware(['admin']), async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add photo(s) to event
router.post('/:id/photos', authMiddleware(['admin', 'employee']), upload.array('media', 10), async (req, res) => {
  try {
    const eventId = req.params.id;
    const files = req.files;
    const captions = req.body.captions ? JSON.parse(req.body.captions) : [];
    if (!files || files.length === 0) return res.status(400).json({ error: 'No files uploaded' });
    const photoDocs = await Promise.all(files.map((file, idx) => {
      console.log('Uploaded file:', file.path, 'URL:', `/uploads/${file.filename}`);
      return Photo.create({
        url: `/uploads/${file.filename}`,
        event: eventId,
        uploadedBy: req.user._id,
        caption: captions[idx] || '',
        status: 'pending', // Set status to pending
      });
    }));
    // Do NOT add to event.photos yet
    res.status(201).json({ message: 'Upload pending admin approval.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all photos for gallery
router.get('/photos/all', async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate('event', 'title')
      .populate('uploadedBy', 'name');
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Approve a photo
router.patch('/photos/:photoId/approve', authMiddleware(['admin']), async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(
      req.params.photoId,
      { status: 'approved' },
      { new: true }
    );
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    // Add to event.photos if not already present
    await Event.findByIdAndUpdate(photo.event, { $addToSet: { photos: photo._id } });
    res.json({ message: 'Photo approved', photo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Reject a photo
router.patch('/photos/:photoId/reject', authMiddleware(['admin']), async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(
      req.params.photoId,
      { status: 'rejected' },
      { new: true }
    );
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.json({ message: 'Photo rejected', photo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 