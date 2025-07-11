const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Photo = require('../models/Photo');
const { authMiddleware } = require('../utils/auth');

// Add comment to photo
router.post('/:photoId', authMiddleware(['admin', 'employee']), async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      photo: req.params.photoId,
      user: req.user._id,
    });
    await comment.save();
    await Photo.findByIdAndUpdate(req.params.photoId, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get comments for a photo
router.get('/:photoId', async (req, res) => {
  try {
    const comments = await Comment.find({ photo: req.params.photoId }).populate('user');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete comment (admin or owner)
router.delete('/:commentId', authMiddleware(['admin', 'employee']), async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (req.user.role !== 'admin' && !comment.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 