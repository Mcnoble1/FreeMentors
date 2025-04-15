import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as User from '../models/userModel.js';

dotenv.config();

export const signup = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.createUser({ ...req.body, password: hashed });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: { token, message: 'User created successfully' }
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findUserByEmail(req.body.email);
    if (!user) return res.status(400).json({ status: 400, error: 'Invalid credentials' });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ status: 400, error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      status: 200,
      message: 'User is successfully logged in',
      data: { token }
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};
