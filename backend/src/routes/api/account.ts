import express from 'express';
import { UserModel } from '../../models/user';
import bcrypt from 'bcrypt';

const accountRouter = express.Router();

accountRouter.put('/update/general/:id', async (req, res) => {
    const userId = req.params.id;
    const update = req.body
    try {
        const user = await UserModel.findById(userId);

        if(!user) {
            return res.status(404).send('User not found');
        }

        user.firstName = update.firstName || user.firstName;
        user.lastName = update.lastName || user.lastName;
        user.email = update.email || user.email;
        user.dateOfBirth = update.dateOfBirth || user.dateOfBirth;

        await user.save();
        res.status(200).send('Account updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

accountRouter.put('update/password/:id', async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
  
    try {
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).send('New password must be different from the old one');
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
  
      await user.save();
      res.status(200).send('Password updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });


export default accountRouter;