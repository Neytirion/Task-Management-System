import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail
} from "../mailtrap/emails.js";

export const signUp = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    const existUser = await User.findOne({email});
    if (existUser) return res.status(400).json({message: 'User already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = email === 'admin@example.com' ? 'admin' : 'user';

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    generateTokenAndSetCookie(res, newUser._id, newUser.role);

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...newUser._doc,
        password: undefined,
      }
    });
  } catch (err) {
    console.error('Sign up error:', err); // <-- добавь это
    res.status(500).json({message: 'Server error'});
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: 'Invalid credentials'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({message: 'Invalid credentials'});

    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: {id: user._id, name: user.name, email: user.email, role: user.role}
    });
  } catch (err) {
    res.status(500).json({message: 'Server error'});
  }
};

export const verifyEmail = async(req, res) => {
  const {code} = req.body;
  try{
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()}
    });

    if(!user){
      return res.status(400).json({message: 'Invalid verification code'});
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });

  }catch(error){

  }
}