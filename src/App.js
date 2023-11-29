import "./App.css";
import { useState } from "react";
import { QuizList } from "./pages/QuizList/QuizList";
import { QuizForm } from "./pages/QuizForm/QuizForm";
import { QuizProvider } from "./comps/QuizContext";

function App() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="App">
      <div className="Container">
        <h1 className="AppHeader">Quizzes</h1>
        <QuizProvider>
          {!showForm && <QuizList toggleForm={toggleForm} />}
          {showForm && <QuizForm closeForm={toggleForm} />}
        </QuizProvider>
      </div>
    </div>
  );
}

export default App;
