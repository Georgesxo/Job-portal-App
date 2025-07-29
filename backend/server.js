require('dotenv').config();
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY); // Debug
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/Profile');
console.log('📁 profileRoutes:', profileRoutes ? '✅ Loaded' : '❌ Undefined');
console.log('📋 profileRoutes methods:', Object.keys(profileRoutes.__proto__));
const app = express();


console.log('🔍 Full ENV:', {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET, // Just check if exists
});

console.log('MONGO_URI:', process.env.MONGO_URI); 
console.log('JWT_SECRET:', process.env.JWT_SECRET); 
console.log('PORT:', process.env.PORT); 

app.use(cors({
  //origin: 'http://your-react-native-app-domain.com', // or use ['http://192.168.x.x:19006'] for dev
}));
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use('/api', authRoutes);
console.log(app._router.stack.map(r => r.route?.path).filter(Boolean));
app.use('/api/profile', profileRoutes);
// Validate MONGO_URI before connecting
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message || err);
    process.exit(1);
  });