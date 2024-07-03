import { useState, useEffect } from "react";
import { decode } from "html-entities";
import Question from "./Question";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple"
        );
        const data = await res.json();

        if (data.results) {
          const fetchedQuestions = data.results.map((result, index) => {
            const allAnswers = [...result.incorrect_answers];
            const randomIndex = Math.floor(
              Math.random() * (allAnswers.length + 1)
            );
            allAnswers.splice(randomIndex, 0, result.correct_answer);
            return {
              ...result,
              question: decode(result.question),
              allAnswers,
              id: index,
              correctAnswer: result.correct_answer
            };
          });
          setQuestions(fetchedQuestions);
        } else {
          console.error("No results found in API response:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (isPlaying) {
      fetchData();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isSubmitted) {
      const correctAnswersMap = {};
      questions.forEach((question) => {
        correctAnswersMap[question.id] = question.correctAnswer;
      });
      setCorrectAnswers(correctAnswersMap);
    }
  }, [isSubmitted, questions]);

  function startQuiz() {
    setIsPlaying(!isPlaying);
  }

  function restartQuiz() {
    setIsPlaying(!isPlaying);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setCorrectAnswers({});
    setQuestions([]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  function handleAnswerChange(id, answer) {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: answer
    }));
  }

  const questionElements = questions.map((question) => (
    <Question
      key={question.id}
      {...question}
      handleAnswerChange={handleAnswerChange}
      isCorrect={selectedAnswers[question.id] === question.correctAnswer}
      isSubmitted={isSubmitted}
      selectedAnswer={selectedAnswers[question.id]}
      correctAnswer={correctAnswers[question.id]}
    />
  ));

  return (
    <main>
      {!isPlaying ? (
        <>
          <h1>Quizzical</h1>
          <button onClick={startQuiz}>Start quiz</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.length > 0 && questionElements}
          {!isSubmitted && <button type="submit">Check answers</button>}
          {isSubmitted && (
            <button type="button" onClick={restartQuiz}>
              Play again
            </button>
          )}
        </form>
      )}
    </main>
  );
}

export default App;
