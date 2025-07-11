const admin = require('firebase-admin');
const User = require('../models/User');

const authMiddleware = (roles = []) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Check if Firebase Admin is initialized
    if (!admin.apps.length) {
      console.warn('Firebase Admin not initialized, skipping token verification');
      // Create a mock user for development
      let user = await User.findOne({ email: 'admin@company.com' });
      if (!user) {
        user = await User.create({
          firebaseUid: 'mock-admin-uid',
          email: 'admin@company.com',
          name: 'Admin User',
          role: 'admin',
        });
      }
      req.user = user;
      next();
      return;
    }
    
    const idToken = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    let user = await User.findOne({ firebaseUid: decodedToken.uid });
    const email = decodedToken.email;
    const isAdmin = email && email.toLowerCase().startsWith('admin');
    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email.split('@')[0],
        role: isAdmin ? 'admin' : 'employee',
        avatar: decodedToken.picture,
      });
    } else if (isAdmin && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }
    req.user = user;
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authMiddleware }; 