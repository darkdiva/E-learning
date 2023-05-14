import { RequestHandler } from 'express'
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];


    const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;


    const currentUser = await User.findOne({ email: payload.email });

    if (!currentUser || currentUser.role !== 'admin') {
      throw new Error('Forbidden');
    }

    // Add user information to request 
    req.user = currentUser;

    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: (err as Error).message });
  }
};

