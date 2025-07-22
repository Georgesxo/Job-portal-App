// routes/profile.js
const express = require('express');
const router = express.Router();
const upload = require('../Uploads');
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');

// Middleware: Verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// POST /api/profile - Save or update profile
router.post(
  '/',
  authenticateToken,
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resumeFile', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const formData = { ...req.body };

      if (typeof formData.socialHandles === 'string') {
        formData.socialHandles = JSON.parse(formData.socialHandles);
      }
      if (typeof formData.experiences === 'string') {
        formData.experiences = JSON.parse(formData.experiences);
      }
      if (typeof formData.education === 'string') {
        formData.education = JSON.parse(formData.education);
      }

      if (req.files.profilePicture) {
        formData.profilePictureUrl = req.files.profilePicture[0].path;
      }
      if (req.files.resumeFile) {
        formData.cvFileUrl = req.files.resumeFile[0].path;
      }

      const existing = await Profile.findOne({ userId });
      if (existing) {
        const updated = await Profile.findOneAndUpdate(
          { userId },
          formData,
          { new: true, runValidators: true }
        );
        return res.json({ success: true, profile: updated });
      }

      const profile = await Profile.create({ ...formData, userId });
      return res.json({ success: true, profile });

    } catch (err) {
      console.error('❌ Error saving profile:', err.message || err);
      return res.status(500).json({ success: false, message: 'Server error saving profile' });
    }
  }
);

// GET /api/candidates/:id - Fetch candidate profile by ID
router.get('/candidates/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: Only allow users to fetch their own profile
    if (req.user.id !== id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const profile = await Profile.findOne({ userId: id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error('❌ Server error fetching candidate:', err.message);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

module.exports = router;