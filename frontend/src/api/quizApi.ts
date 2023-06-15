import { createQuiz, getQuizById , updateQuiz,deleteQuiz ,submitQuiz} from 'backend\src\services\quizzServices.ts';

const quizData = {
    title: 'My Quiz',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Rome'],
        correctAnswer: 0,
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
        correctAnswer: 0,
      },
      // Add more questions here
    ],
  };

  const quizId = 'quizId'; // Provide the ID of the quiz you want 

  const answers = {
    // Provide the answers for the quiz submission
  };

createQuiz(quizData)
  .then((createdQuiz: any) => {
    // Process and use the created quiz in the frontend
    console.log(createdQuiz);
  })
  .catch((error: any) => {
    // Handle error
    console.error(error);
  });

getQuizById('quizId')
  .then((quiz: any) => {
    // Process and use the retrieved quiz in the frontend
    console.log(quiz);
  })
  .catch((error: any) => {
    // Handle error
    console.error(error);
  });

  updateQuiz(quizId, quizData)
  .then((updatedQuiz: any) => {
    // Process and use the updated quiz in the frontend
    console.log(updatedQuiz);
  })
  .catch((error: any) => {
    // Handle error
    console.error(error);
  });


deleteQuiz(quizId)
  .then(() => {
    // Quiz deleted successfully
    console.log('Quiz deleted');
  })
  .catch((error: any) => {
    // Handle error
    console.error(error);
  });

submitQuiz(quizId, answers)
  .then((result: any) => {
    // Process the result of the quiz submission
    console.log('Quiz submitted:', result);
  })
  .catch((error: any) => {
    // Handle error
    console.error(error);
  });