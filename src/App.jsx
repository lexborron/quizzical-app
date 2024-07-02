import { useState, useEffect } from "react";
import Question from "./Question";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
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

  function startQuiz() {
    setIsPlaying(!isPlaying);
  }

  const questionElements = questions.map((question, index) => (
    <Question key={index} {...question} />
  ));

  return (
    <main>
      {!isPlaying ? (
        <>
          <h1>Quizzical</h1>
          <button onClick={startQuiz}>Start quiz</button>
        </>
      ) : (
        <>
          {questions.length > 0 && questionElements}
          <button>Check answers</button>
        </>
      )}
    </main>
  );
}

export default App;
