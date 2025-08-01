require('dotenv').config();
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
const profileRoutes = require('./routes/Profile');

console.log('📁 profileRoutes:', profileRoutes ? '✅ Loaded' : '❌ Undefined');
console.log('📋 profileRoutes methods:', Object.keys(profileRoutes.__proto__));

const app = express();

console.log('🔍 Full ENV:', {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
});

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT);

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use('/api', authRoutes);
app.use('/api/profile', profileRoutes);

// Validate MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1);
}

// ✅ DEFINE cleanupIndexes BEFORE using it
const cleanupIndexes = async () => {
  try {
    await User.collection.dropIndex('userId_1').catch(err => {
      if (err.code === 27 || err.message.includes('not found')) {
        console.log('ℹ️ Index userId_1 not found – already removed');
      } else {
        console.warn('⚠️ Error dropping index:', err.message);
      }
    });
    console.log('✅ Index userId_1 removed (if it existed)');
  } catch (err) {
    console.error('🚨 Failed to drop index:', err);
  }
};

// ✅ Now connect and call cleanupIndexes
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // ✅ Now safe to call – function is in scope
    await cleanupIndexes();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message || err);
    process.exit(1);
  });