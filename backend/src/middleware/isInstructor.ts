import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { AuthRequest } from '../types/AuthRequest';

const isInstructor = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Retrieve the token from the request headers or query parameters
    const token = req.headers.authorization?.split(' ')[1] || (req.query.token as string);

    if (!token) {
      res.status(401).json({ message: 'Authentication token not found' });
      return;
    }

    // Verify the token
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Retrieve the user ID from the decoded token
    const userId = decodedToken.userId;

    // Retrieve the user information from the database
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(401).json({ message: 'Invalid user' });
      return;
    }

    // Check if the user role is 'instructor'
    if (user.role !== 'instructor') {
      res.status(403).json({ message: 'Not authorized as an instructor' });
      return;
    }

    // Store the user ID in the request object
    req.user = { id: userId };

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { isInstructor };
