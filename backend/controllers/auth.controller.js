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

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign(
      {id: newUser._id, role: newUser.role},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 день
      })
      .status(201)
      .json({message: 'Регистрация прошла успешно'});
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

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 дней
      })
      .json({message: 'Успешный вход'});
  } catch (err) {
    res.status(500).json({message: 'Server error'});
  }
};

export const logout = (req, res) => {
  res.clearCookie('token').json({message: 'Вы вышли из системы'});
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({message: 'Нет токена'});

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({message: 'Пользователь не найден'});

    res.json(user);
  } catch (err) {
    res.status(401).json({message: 'Невалидный токен'});
  }
};
