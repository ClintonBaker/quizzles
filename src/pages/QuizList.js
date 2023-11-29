import { useContext } from "react";
import { QuizContext } from "../comps/QuizContext";

export const QuizList = ({ toggleForm }) => {
  const { quizzes, setSelected } = useContext(QuizContext);

  const handleClick = (quiz) => {
    setSelected(quiz);
    toggleForm();
  };

  return (
    <div>
      {quizzes.map((quiz, index) => (
        <div key={index}>
          <div>{quiz.title}</div>
          <button
            type="button"
            onClick={() => {
              handleClick(quiz);
            }}
          >
            Edit
          </button>
        </div>
      ))}

      <button type="button" onClick={toggleForm}>
        New Quiz
      </button>
    </div>
  );
};
