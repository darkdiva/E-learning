import express = require('express');
import { createQuiz,getQuizzes,getQuizById,updateQuizById,deleteQuizById } from '../../controllers/QuizController';

const router = express.Router();

// Create a new quiz
router.post('/quizzes', createQuiz);

// Get all quizzes
router.get('/quizzes', getQuizzes);

// Get a specific quiz by ID
router.get('/quizzes/:id', getQuizById);

// Update a quiz by ID
router.put('/quizzes/:id', updateQuizById);

// Delete a quiz by ID
router.delete('/quizzes/:id', deleteQuizById);

export default router;
