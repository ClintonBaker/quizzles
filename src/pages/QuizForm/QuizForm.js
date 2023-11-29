import "./QuizForm.css";
import { useContext, useState } from "react";
import { QuizContext } from "../../comps/QuizContext";

export const QuizForm = ({ closeForm }) => {
  const { newQuiz, updateQuiz, selected, setSelected } =
    useContext(QuizContext);
  const [quizData, setQuizData] = useState(
    selected || {
      title: "",
      description: "",
      questions_answers: [
        {
          text: "",
          feedback_false: "",
          feedback_true: "",
          answers: [
            {
              is_true: false,
              text: "",
            },
          ],
        },
      ],
      score: null,
      url: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  const handleQnAChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQnA = [...quizData.questions_answers];
    updatedQnA[index] = { ...updatedQnA[index], [name]: value };

    setQuizData({ ...quizData, questions_answers: updatedQnA });
  };

  const handleAnswersChange = (qIndex, aIndex, e) => {
    const { name, value } = e.target;
    const updatedQnA = [...quizData.questions_answers];
    updatedQnA[qIndex].answers[aIndex][name] = value;

    setQuizData({ ...quizData, questions_answers: updatedQnA });
  };

  const handleAnswerCheck = (qIndex, aIndex) => {
    const updatedQnA = [...quizData.questions_answers];

    const updatedAnswers = updatedQnA[qIndex].answers.map((answer, index) => {
      return {
        ...answer,
        is_true: aIndex === index ? !answer.is_true : false,
      };
    });

    updatedQnA[qIndex] = { ...updatedQnA[qIndex], answers: updatedAnswers };

    setQuizData({ ...quizData, questions_answers: updatedQnA });
  };

  const addQuestion = () => {
    const newQuestion = {
      text: "",
      feedback_false: "",
      feedback_true: "",
      answers: [
        {
          is_true: false,
          text: "",
        },
      ],
    };

    setQuizData({
      ...quizData,
      questions_answers: [...quizData.questions_answers, newQuestion],
    });
  };

  const removeQuestion = (qIndex) => {
    const updatedQnA = [...quizData.questions_answers];
    if (updatedQnA.length > 1) {
      updatedQnA.splice(qIndex, 1);
      setQuizData({ ...quizData, questions_answers: updatedQnA });
    }
  };

  const addAnswer = (qIndex) => {
    const newAnswer = { is_true: false, text: "" };
    const updatedQnA = [...quizData.questions_answers];
    updatedQnA[qIndex].answers.push(newAnswer);

    setQuizData({
      ...quizData,
      questions_answers: updatedQnA,
    });
  };

  const removeAnswer = (qIndex, aIndex) => {
    const updatedQnA = [...quizData.questions_answers];
    if (updatedQnA[qIndex].answers.length > 1) {
      const updatedAnswers = [...updatedQnA[qIndex].answers];
      updatedAnswers.splice(aIndex, 1);

      updatedQnA[qIndex] = { ...updatedQnA, answers: updatedAnswers };

      setQuizData({ ...quizData, questions_answers: updatedQnA });
    }
  };

  const handleCancel = () => {
    setSelected(null);
    closeForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selected ? updateQuiz(quizData) : newQuiz(quizData);
    setSelected(null);
    closeForm();
  };

  return (
    <form className="QuizForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={quizData.title}
          onChange={handleChange}
          placeholder="Quiz Title"
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          name="description"
          value={quizData.description}
          onChange={handleChange}
          placeholder="Description for Quiz"
        />
      </div>
      <div>
        <label htmlFor="ytUrl">YouTube URL:</label>
        <input
          id="ytUrl"
          type="text"
          name="url"
          value={quizData.url}
          onChange={handleChange}
          placeholder="YouTube URL"
        />
      </div>
      <div className="QuizQnA">
        <h2>Questions and Answers</h2>
        <button
          type="button"
          onClick={() => {
            addQuestion();
          }}
        >
          New Question
        </button>
        {quizData.questions_answers.map((question, qIndex) => {
          const qKey = `question-${qIndex}`;
          return (
            <div className="QuizQuestion" key={qKey}>
              <span
                className="RemoveQuestion"
                onClick={() => {
                  removeQuestion(qIndex);
                }}
              >
                x
              </span>
              <div>
                <label htmlFor={`${qKey}-text`}>Question:</label>
                <input
                  id={`${qKey}-text`}
                  type="text"
                  name="text"
                  value={question.text}
                  onChange={(e) => {
                    handleQnAChange(qIndex, e);
                  }}
                  placeholder="Enter a question"
                />
              </div>
              <div>
                <label htmlFor={`${qKey}-feedback_true`}>
                  Correct Answer Feedback:
                </label>
                <input
                  id={`${qKey}-feedback_true`}
                  type="text"
                  name="feedback_true"
                  value={question.feedback_true}
                  onChange={(e) => {
                    handleQnAChange(qIndex, e);
                  }}
                  placeholder="Feedback for the correct answer"
                />
              </div>
              <div>
                <label htmlFor={`${qKey}-feedback_false`}>
                  Wrong Answer Feedback:
                </label>
                <input
                  id={`${qKey}-feedback_false`}
                  type="text"
                  name="feedback_false"
                  value={question.feedback_false}
                  onChange={(e) => {
                    handleQnAChange(qIndex, e);
                  }}
                  placeholder="Feedback for an incorrect answer"
                />
              </div>
              <div>
                <div className="QuizAnswers">
                  <h4>Answers</h4>
                  <button
                    type="button"
                    onClick={() => {
                      addAnswer(qIndex);
                    }}
                  >
                    Add New Answer
                  </button>
                </div>
                {question.answers.map((answer, aIndex) => {
                  const aKey = `${qKey}-a-${aIndex}`;
                  return (
                    <div className="QuizAnswer" key={aKey}>
                      <span
                        className="RemoveAnswer"
                        onClick={() => {
                          removeAnswer(qIndex, aIndex);
                        }}
                      >
                        x
                      </span>
                      <input
                        type="text"
                        name="text"
                        id={`${aKey}-text`}
                        value={answer.text}
                        placeholder="Input answer"
                        onChange={(e) => {
                          handleAnswersChange(qIndex, aIndex, e);
                        }}
                      />
                      <label htmlFor={`${aKey}-is_true`}>Correct</label>
                      <input
                        className="AnswerCheckbox"
                        type="checkbox"
                        name="is_true"
                        id={`${aKey}-is_true`}
                        checked={answer.is_true}
                        onChange={() => {
                          handleAnswerCheck(qIndex, aIndex);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="FormButtons">
        <button
          type="button"
          className="FormButtons-Secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="FormButtons-Primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </form>
  );
};
