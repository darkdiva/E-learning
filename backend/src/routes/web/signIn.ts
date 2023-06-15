import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  { User, UserModel } from '../../models/user';

const JWT_SECRET: string = process.env.JWT_SECRET || '';

async function signin(req: Request, res: Response){
  const { email, password } = req.body;

  try {
    // Find the user with the specified email
    const user: User | null = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create and sign a JWT with the user ID and email
    const token: string = jwt.sign({ userId: user._id, email: user.email } , JWT_SECRET);

   // Return user data and token
   res.status(200).json({
    success: true,
    message: 'User authenticated successfully',
    data: {
      user,
      token,
    },
  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { signin };
