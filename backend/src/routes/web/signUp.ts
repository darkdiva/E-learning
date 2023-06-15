import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  { User,UserModel} from '../../models/User';

const JWT_SECRET: string = process.env.JWT_SECRET || '';

async function signup(req: Request, res: Response): Promise<Response> {
  const { fullName, email, password, phoneNumber, country, dateOfBirth, createdAt, updatedAt} = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser: User | null = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser: User = new UserModel({
        fullName,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: hashedPassword,
        phoneNumber,
        country,
        dateOfBirth,
        createdAt,
        updatedAt,
    });

    // Save the user to the database
    await newUser.save();

    // Create and sign a JWT with the user ID and email
    const token: string = jwt.sign({ userId: newUser._id, email: newUser.email } , JWT_SECRET);

    // Return the JWT
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export { signup };
