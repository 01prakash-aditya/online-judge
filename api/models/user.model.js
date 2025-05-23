import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profilePicture: {
    type: String,
    default: 'https://www.pngmart.com/files/23/Profile-PNG-Photo.png',
  },
  bio: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  questionCount: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

export default User;