import "./QuizList.css";
import { useContext } from "react";
import { QuizContext } from "../../comps/QuizContext";

export const QuizList = ({ toggleForm }) => {
  const { quizzes, setSelected } = useContext(QuizContext);

  const handleClick = (quiz) => {
    setSelected(quiz);
    toggleForm();
  };

  return (
    <div>
      <button className="NewQzBtn" type="button" onClick={toggleForm}>
        New Quiz
      </button>
      {quizzes.map((quiz, index) => (
        <div key={index} className="QuizItem">
          <div className="QuizTitle">{quiz.title}</div>
          <button
            className="EditQzBtn"
            type="button"
            onClick={() => {
              handleClick(quiz);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};
