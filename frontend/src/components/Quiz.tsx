import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

const QuizComponent: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    id: '',
    title: '',
    questions: [],
  });
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('/api/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.log('Failed to fetch quizzes:', error);
    }
  };

  const createQuiz = async () => {
    try {
      const response = await axios.post('/api/quizzes', newQuiz);
      setQuizzes([...quizzes, response.data]);
      setNewQuiz({ id: '', title: '', questions: [] });
    } catch (error) {
      console.log('Failed to create quiz:', error);
    }
  };

  const updateQuiz = async () => {
    if (selectedQuiz) {
      try {
        const response = await axios.put(`/api/quizzes/${selectedQuiz.id}`, selectedQuiz);
        const updatedQuizzes = quizzes.map((quiz) =>
          quiz.id === response.data.id ? response.data : quiz
        );
        setQuizzes(updatedQuizzes);
        setSelectedQuiz(null);
      } catch (error) {
        console.log('Failed to update quiz:', error);
      }
    }
  };

  const deleteQuiz = async (quizId: string) => {
    try {
      await axios.delete(`/api/quizzes/${quizId}`);
      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.log('Failed to delete quiz:', error);
    }
  };

  const selectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  return (
    <div>
      <h1>Create Quiz</h1>
      <input
        type="text"
        placeholder="Quiz ID"
        value={newQuiz.id}
        onChange={(e) => setNewQuiz({ ...newQuiz, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Quiz Title"
        value={newQuiz.title}
        onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
      />
      <button onClick={createQuiz}>Create Quiz</button>

      <h1>Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>
          <h2>{quiz.title}</h2>
          <button onClick={() => selectQuiz(quiz)}>Edit</button>
          <button onClick={() => deleteQuiz(quiz.id)}>Delete</button>
        </div>
      ))}

      {selectedQuiz && (
        <div>
          <h1>Edit Quiz</h1>
          <input
            type="text"
            placeholder="Quiz ID"
            value={selectedQuiz.id}
            onChange={(e) => setSelectedQuiz({ ...selectedQuiz, id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Quiz Title"
            value={selectedQuiz.title}
            onChange={(e) => setSelectedQuiz({ ...selectedQuiz, title: e.target.value })}
          />
          <button onClick={updateQuiz}>Update Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
