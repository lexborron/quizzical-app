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
      setQuestions(data.results);
      console.log(data.results);
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
