import express from 'express';
import { signin } from '../web/signIn';
import { signup } from '../web/signUp';

const Authrouters = express.Router();

// POST /api/auth/signin
Authrouters.post('/signin', signin);

// POST /api/auth/signup
Authrouters.post('/signup', signup);

export default Authrouters;
