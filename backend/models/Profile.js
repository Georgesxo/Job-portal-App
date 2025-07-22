// models/profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  profilePictureUrl: String,
  cvFileUrl: String,
  program: String,
  yourName: String,
  yourEmail: String,
  bio: String,
  skills: String,
  jobType: String,
  socialHandles: {
    facebook: String,
    twitter: String,
    instagram: String,
    LinkedIn: String,
    Website: String,
    github: String,
  },
  experiences: [
    {
      company: String,
      title: String,
      startDate: String,
      endDate: String,
      currentWork: Boolean,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      startDate: String,
      endDate: String,
      currentSchool: Boolean,
      description: String,
    },
  ],
});

module.exports = mongoose.model('Profile', profileSchema);