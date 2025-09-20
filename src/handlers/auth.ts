import { Request, Response } from 'express';
import User from '../models/User.model';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser)
    return res.status(400).send({ error: 'User already exists' });

  const user = new User({ name, email, password });
  await user.hashPassword();
  await user.save();
  res.status(201).send({ data: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.checkPassword(password))) {
    return res.status(401).send({ error: 'Invalid email or password' });
  }

  const JWT_SECRET = process.env.JWT_SECRET!;

  // Generate JWT
  const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  // Send token in response along with user info
  res.send({
    data: { token, user: { id: user.id, name: user.name, email: user.email } },
  });
};
