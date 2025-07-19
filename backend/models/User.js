const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  profilePicture: String,
  program: String,
  yourName: String,
  yourEmail: String,
  bio: String,
  skills: String,
  jobType: String,
  resume: String,
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

module.exports = mongoose.model('User', userSchema);