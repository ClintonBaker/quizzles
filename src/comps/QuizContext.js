import { createContext, useState } from "react";

export const QuizContext = createContext();

const getCurrTime = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [selected, setSelected] = useState(null);

  const newQuiz = (quiz) => {
    const updatedQnA = quiz.questions_answers.map((question, index) => ({
      ...question,
      id: index,
      answer_id: null,
      answers: question.answers.map((answer, index) => ({
        ...answer,
        id: index,
      })),
    }));

    const newQuiz = {
      ...quiz,
      created: getCurrTime(),
      modified: getCurrTime(),
      id: quizzes.length,
      questions_answers: updatedQnA,
      score: null,
    };

    setQuizzes([...quizzes, newQuiz]);
  };

  const updateQuiz = (updatedQuiz) => {
    const index = quizzes.findIndex((quiz) => quiz.id === updatedQuiz.id);
    const updatedQuizes = [...quizzes];
    updatedQuizes[index] = {
      ...updatedQuiz,
      modified: getCurrTime(),
    };

    setQuizzes([...updatedQuizes]);
  };

  return (
    <QuizContext.Provider
      value={{ quizzes, newQuiz, updateQuiz, selected, setSelected }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const exampleQuiz = {
  created: "2020-09-09 09:26:39",
  description: "Description",
  id: 29,
  modified: "2020-09-09 09:26:39",
  questions_answers: [
    {
      answer_id: null,
      answers: [
        {
          id: 122,
          is_true: false,
          text: "question 1 answer 1 false",
        },
        {
          id: 123,
          is_true: false,
          text: "question 1 answer 2 false",
        },
        {
          id: 124,
          is_true: true,
          text: "question 1 answer 3 true",
        },
        {
          id: 125,
          is_true: false,
          text: "question 1 answer 4 false",
        },
      ],
      feedback_false: "question 1 false feedback",
      feedback_true: "question 1 true feedback",
      id: 53,
      text: "question 1 text",
    },
    {
      answer_id: null,
      answers: [
        {
          id: 126,
          is_true: true,
          text: "question 2 answer 1 true",
        },
        {
          id: 127,
          is_true: false,
          text: "question 2 answer 2 false",
        },
      ],
      feedback_false: "question 2 false feedback",
      feedback_true: "question 2 true feedback",
      id: 54,
      text: "question 2 text",
    },
    {
      answer_id: null,
      answers: [
        {
          id: 128,
          is_true: false,
          text: "question 3 answer 1 false",
        },
        {
          id: 129,
          is_true: true,
          text: "question 3 answer 2 true",
        },
        {
          id: 130,
          is_true: false,
          text: "question 3 answer 3 false",
        },
      ],
      feedback_false: "question 3 false feedback",
      feedback_true: "question 3 true feedback",
      id: 55,
      text: "question 3 text",
    },
  ],
  score: null,
  title: "quiz title",
  url: "https://www.youtube.com/watch?v=e6EGQFJLl04",
};
