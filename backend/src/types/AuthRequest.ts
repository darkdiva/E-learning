import { Request } from "express";
import { User, UserModel } from "../models/user";



export interface AuthRequest extends Request {
  user?: {
    id: string;
    isadmin : boolean
  };
}
