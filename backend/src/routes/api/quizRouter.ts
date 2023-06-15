import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question as questions } from '../models/quiz';

const quizRouter = express.Router();

let quizzes: Quiz[] = [];

quizRouter.get('/', (req: Request, res: Response) => {
  res.json(quizzes);
});

quizRouter.post('/', (req: Request, res: Response) => {
  const newQuiz: Quiz = {
    id: uuidv4(),
    title: req.body.title,
    questions: req.body.questions,
  };
  quizzes.push(newQuiz);
  res.status(201).json(newQuiz);
});

quizRouter.get('/:id', (req: Request, res: Response) => {
  const quiz = quizzes.find(q => q.id === req.params.id);
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).json({ message: 'Quiz not found' });
  }
});

quizRouter.post('/:id/submit', (req: Request, res: Response) => {
  const quiz = quizzes.find(q => q.id === req.params.id);
  if (quiz) {
    const submittedQuiz = {
      quizId: quiz.id,
      answers: req.body.answers,
    };
    res.status(201).json(submittedQuiz);
  } else {
    res.status(404).json({ message: 'Quiz not found' });
  }
});

export default quizRouter;
