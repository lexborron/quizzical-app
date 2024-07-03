import { useState } from "react";

function Question({ question, id, allAnswers, handleAnswerChange }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  function handleChange(event) {
    const answer = event.target.value;
    setSelectedAnswer(answer);
    handleAnswerChange(id, answer);
  }

  return (
    <>
      <div>
        <p>{question}</p>
        {allAnswers.map((answer, index) => (
          <label key={index} htmlFor={`${id}-${index + 1}`}>
            <input
              type="radio"
              name={id}
              id={`${id}-${index + 1}`}
              value={answer}
              checked={selectedAnswer === answer}
              onChange={handleChange}
            />
            {answer}
          </label>
        ))}
      </div>
      <hr />
    </>
  );
}

export default Question;
