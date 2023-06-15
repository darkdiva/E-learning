import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from '../models/quiz';
import { getQuizById } from '../services/api';

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const quizzes = await getQuizById(Quiz);
      setQuizzes(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div>
      <h2>Quiz List</h2>
      {quizzes.map(quiz => (
        <div key={quiz.id}>
          <h3>{quiz.title}</h3>
          <Link to={`/quiz/${quiz.id}`}>Start
          Quiz</Link>
</div>
))}
</div>
);
};

export default QuizList;