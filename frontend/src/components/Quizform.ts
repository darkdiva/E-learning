import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question } from '../models/quiz';
import { createQuiz } from '../services/api';

const QuizForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);

  const addQuestion = () => {
    setQuestions(prevQuestions => [
      ...prevQuestions,
      {
        id: uuidv4(),
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const handleQuestionChange = (
    questionId: string,
    text: string
  ) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = prevQuestions.map(question =>
        question.id === questionId ? { ...question, text } : question
      );
      return updatedQuestions;
    });
  };

  const handleOptionChange = (
    questionId: string,
    optionIndex: number,
    optionText: string
  ) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = prevQuestions.map(question => {
        if (question.id === questionId) {
          const updatedOptions = [...question.options];
          updatedOptions[optionIndex] = optionText;
          return { ...question, options: updatedOptions };
        }
        return question;
      });
      return updatedQuestions;
    });
  };

  const handleCorrectAnswerChange = (
    questionId: string,
    correctAnswer: number
  ) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = prevQuestions.map(question =>
        question.id === questionId ? { ...question, correctAnswer } : question
      );
      return updatedQuestions;
    });
  };

  const handleCreateQuiz = async () => {
    const newQuiz: Quiz = {
      id: uuidv4(),
      title,
      questions,
    };

    try {
      await createQuiz(newQuiz,Quiz);
      console.log('Quiz created successfully');
      // Reset form fields or navigate to quiz list
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <h3>Questions:</h3>
        {questions.map((question, index) => (
          <div key={question.id}>
            <label>
              Question:
              <input
                type="text"
                value={question.text}
                onChange={e =>
                  handleQuestionChange(question.id, e.target.value)
                }
              />
            </label>
            <br />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  Option {optionIndex + 1}:
                  <input
                    type="text"
                    value={option}
                    onChange={e =>
                      handleOptionChange(
                        question.id,
                        optionIndex,
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
            ))}
            <label>
              Correct Answer:
              <select
                value={question.correctAnswer}
                onChange={e =>
                  handleCorrectAnswerChange(
                    question.id,
                    parseInt(e.target.value)
                  )
                }
              >
                {question.options.map((_, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    Option {optionIndex + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="button" onClick={handleCreateQuiz}>
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
