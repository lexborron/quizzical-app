import { useState } from "react";

function Question({ question, allAnswers, id }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  function handleChange(event) {
    setSelectedAnswer(event.target.value);
  }

  return (
    <>
      <div>
        <p>{question}</p>
        {allAnswers.map((answer, index) => {
          return (
            <label key={index}>
              <input
                type="radio"
                name={`question-${id}`}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleChange}
              />
              {answer}
            </label>
          );
        })}
      </div>
      <hr></hr>
    </>
  );
}

export default Question;
