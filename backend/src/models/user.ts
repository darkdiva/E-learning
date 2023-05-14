
import mongoose,{Schema, model,  } from 'mongoose';
export interface User extends mongoose.Document {
  id : string ;
  fullName: string;
  email: string;
  password: string;
  phoneNumber:string;
  country:string;
  dateOfBirth:Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<User>({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = model<User>('User', userSchema);