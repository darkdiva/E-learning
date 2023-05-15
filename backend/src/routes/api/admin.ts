import express, { Response } from 'express'
import { AuthRequest } from '../../types/AuthRequest'
import bcrypt from 'bcrypt'
import { UserModel } from '../../models/user'
import { isAdmin } from '../../middleware/authAdmin'


const adminRouter = express.Router();

adminRouter.get('/community', isAdmin, async (req:AuthRequest, res:Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error:any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

adminRouter.get('/community/:role', isAdmin, async (req:AuthRequest, res: Response) => {
  try{
    const users = await UserModel.find();
    const role = req.params.role;
    const filteredUsers = users.filter((user) => user.role === role);
    res.json(filteredUsers);
  } catch (error:any){
    console.error(error.message);
    res.status(500).send('Server Error');
  }

});


adminRouter.post('/users/new', isAdmin, async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, email, password, dateOfBirth, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with given email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role,
      createdAt: Date.now
    });
    if (dateOfBirth) {
      newUser.dateOfBirth= dateOfBirth;
    }
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created', user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

adminRouter.delete('/users/:id', isAdmin, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted', user: deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

adminRouter.put('/users/:id', isAdmin, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, dateOfBirth, role, updatedAt } = req.body;

  try {
    const originalUser = await UserModel.findById(id);
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        dateOfBirth,
        role,
        updatedAt: Date.now
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (JSON.stringify(updatedUser) === JSON.stringify(originalUser)) {
      return res.status(200).json({ message: 'No changes made' });
    }

    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

export default adminRouter
