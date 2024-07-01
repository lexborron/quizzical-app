import { useState, useEffect } from "react";
import Question from "./Question";
import "./App.css";

function App() {
  const hasStarted = true;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple"
      );
      const data = await res.json();
      setQuestions(
        data.results.map((result, index) => {
          const allAnswers = [...result.incorrect_answers];
          const randomIndex = Math.floor(
            Math.random() * (allAnswers.length + 1)
          );
          allAnswers.splice(randomIndex, 0, result.correct_answer);
          return {
            ...result,
            allAnswers,
            id: { index }
          };
        })
      );
    }
    fetchData();
  }, []);

  const questionElements =
    questions.length > 0 &&
    questions.map((question, index) => <Question key={index} {...question} />);

  return (
    <main>
      {!hasStarted ? (
        <>
          <h1>Quizzical</h1>
          <button>Start quiz</button>
        </>
      ) : (
        <>
          {questionElements}
          <button>Check answers</button>
        </>
      )}
    </main>
  );
}

export default App;
