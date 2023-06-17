import { Request, Response } from 'express';
import { Quiz } from '../models/quiz';

const quizzes: Quiz[] = [];

// Create a new quiz
export const createQuiz = (req: Request, res: Response): void => {
  try {
    const { id, title, questions } = req.body;

    const newQuiz: Quiz = {
      id,
      title,
      questions,
    };

    quizzes.push(newQuiz);

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Get all quizzes
export const getQuizzes = (req: Request, res: Response): void => {
  res.status(200).json(quizzes);
};

// Get a specific quiz by ID
export const getQuizById = (req: Request, res: Response): void => {
  const { id } = req.params;

  const quiz = quizzes.find((quiz) => quiz.id === id);

  if (quiz) {
    res.status(200).json(quiz);
  } else {
    res.status(404).json({ error: 'Quiz not found' });
  }
};

// Update a quiz by ID
export const updateQuizById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { title, questions } = req.body;

  const quiz = quizzes.find((quiz) => quiz.id === id);

  if (quiz) {
    quiz.title = title;
    quiz.questions = questions;

    res.status(200).json(quiz);
  } else {
    res.status(404).json({ error: 'Quiz not found' });
  }
};

// Delete a quiz by ID
export const deleteQuizById = (req: Request, res: Response): void => {
  const { id } = req.params;

  const index = quizzes.findIndex((quiz) => quiz.id === id);

  if (index !== -1) {
    const deletedQuiz = quizzes.splice(index, 1)[0];
    res.status(200).json({ message: 'Quiz deleted', quiz: deletedQuiz });
  } else {
    res.status(404).json({ error: 'Quiz not found' });
  }
};
