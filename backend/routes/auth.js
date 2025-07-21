const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const path = require('path');
const multer = require('multer'); 
const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 

// Sign Up
router.post('/signup', async (req, res) => {
  const { studentId, email, password } = req.body;
  if (!studentId || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    const existing = await User.findOne({ $or: [{ studentId }, { email },{ password }] });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ studentId, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { studentId: user.studentId, email: user.email,  password: user.password } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { studentId, email, password } = req.body;
  if (!studentId || !password || !email) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    const user = await User.findOne({ studentId });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { studentId: user.studentId, email: user.email, password: user.password } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

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
      const formData = req.body;

      if (req.files['profilePicture']) {
        formData.profileImage = req.files['profilePicture'][0].path; // Cloudinary URL
      }

      if (req.files['resumeFile']) {
        formData.cvFile = req.files['resumeFile'][0].path; // Cloudinary URL
      }

      const existing = await Profile.findOne({ userId });

      if (existing) {
        const updated = await Profile.findOneAndUpdate(
          { userId },
          formData,
          { new: true }
        );
        return res.json({ success: true, profile: updated });
      }

      const profile = await Profile.create({
        ...formData,
        userId
      });

      res.json({ success: true, profile });

    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error saving profile' });
    }
  }
);

module.exports = router;