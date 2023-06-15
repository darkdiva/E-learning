import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question } from '../models/quiz';

const router = express.Router();

let quizzes: Quiz[] = [];

router.get('/', (req: Request, res: Response) => {
  res.json(quizzes);
});

router.post('/', (req: Request, res: Response) => {
  const newQuiz: Quiz = {
    id: uuidv4(),
    title: req.body.title,
    questions: req.body.questions,
  };
  quizzes.push(newQuiz);
  res.sendStatus(201);
});

export default router;
