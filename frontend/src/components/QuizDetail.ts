import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz, Question } from '../models/quiz';
import { getQuiz, submitQuiz } from '../services/api';

const QuizDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const quiz = await getQuiz(id);
      setQuiz(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleAnswerChange = (
    questionId: string,
    selectedOption: number
  ) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      await submitQuiz(id, answers);
      console.log('Quiz submitted successfully');
      // Show submission success message or navigate to quiz list
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }
  else return (
    <div>
      <h2>{quiz.title}</h2>
      <h3>Questions:</h3>
      {quiz.questions.map(question => (
        <div key={question.id}>
          <p>{question.text}</p>
          {question.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={question.id}
                value={index}
                checked={answers[question.id] === index}
                onChange={() => handleAnswerChange(question.id, index)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="button" onClick={handleSubmitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizDetail;
