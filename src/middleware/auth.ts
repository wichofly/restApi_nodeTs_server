import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).send({ error: 'Unauthorized' });

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = payload;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
};
