import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
//test text
    const token = jwt.sign(
      {id: newUser._id, role: newUser.role},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
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
