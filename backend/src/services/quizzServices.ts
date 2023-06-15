import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question } from '../models/quiz';

let quizzes: Quiz[] = [];

export const getAllQuizzes = (): Quiz[] => {
  return quizzes;
};

export const createQuiz = (title: string, questions: Question[]): Quiz => {
  const newQuiz: Quiz = {
    id: uuidv4(),
    title,
    questions,
  };
  quizzes.push(newQuiz);
  return newQuiz;
};

export const getQuizById = (quizId: string): Quiz | undefined => {
  return quizzes.find((quiz) => quiz.id === quizId);
};

export const updateQuiz = (
  quizId: string,
  title: string,
  questions: Question[]
): Quiz | undefined => {
  const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);
  if (quizIndex !== -1) {
    const updatedQuiz: Quiz = {
      id: quizId,
      title,
      questions,
    };
    quizzes[quizIndex] = updatedQuiz;
    return updatedQuiz;
  }
  return undefined;
};

export const deleteQuiz = (quizId: string): boolean => {
  const initialLength = quizzes.length;
  quizzes = quizzes.filter((quiz) => quiz.id !== quizId);
  return quizzes.length !== initialLength;
};

export const submitQuiz = (quizId: string, answers: Record<string, number>): boolean => {
  const quiz = getQuizById(quizId);

   
  if (quiz) {
    const score = calculateScore(quiz, answers);

    // Store the submitted quiz and the calculated score in a database or perform any other relevant operations
    const submittedQuiz = {
      id: quiz.id,
      title: quiz.title,
      questions: quiz.questions,
      answers,
      score,
    };

    // Example: Save the submitted quiz and the score to a database
    saveSubmittedQuiz(submittedQuiz);

    return true;
  }
  return false;
};

const calculateScore = (quiz: Quiz, answers: Record<string, number>): number => {
  let correctAnswers = 0;

  quiz.questions.forEach((question: { id: string | number; correctAnswer: number; }) => {
    const userAnswer = answers[question.id];
    if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const totalQuestions = quiz.questions.length;
  const score = (correctAnswers / totalQuestions) * 100;

  return score;
};

const saveSubmittedQuiz = (submittedQuiz: SubmittedQuiz): void => {
  // Implement the logic to save the submitted quiz to a database or perform any other desired actions
  // For demonstration purposes, this example just logs the submitted quiz to the console
  console.log('Submitted Quiz:', submittedQuiz);
};

interface SubmittedQuiz {
  id: string;
  title: string;
  questions: Question[];
  answers: Record<string, number>;
  score: number;
}
