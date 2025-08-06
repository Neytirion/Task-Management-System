import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['user', 'admin'], default: 'user'},
  lastLogin: {type: Date, default: Date.now},
  isVerified: {type: Boolean, default: false},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,

}, {timestamps: true});

export default mongoose.model('User', userSchema);
