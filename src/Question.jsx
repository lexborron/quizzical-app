import "./App.css";

function Question({
  question,
  id,
  allAnswers,
  handleAnswerChange,
  isSubmitted,
  selectedAnswer,
  correctAnswer
}) {
  function handleChange(event) {
    const answer = event.target.value;
    handleAnswerChange(id, answer);
  }

  function getStyles(answer) {
    if (!isSubmitted) {
      return selectedAnswer === answer ? { backgroundColor: "lawngreen" } : {};
    }
    if (answer === correctAnswer) {
      if (answer === selectedAnswer) {
        return { backgroundColor: "green", color: "white" };
      }
      return { backgroundColor: "green" };
    }
    if (answer === selectedAnswer) {
      return { backgroundColor: "red" };
    }
    return {};
  }

  return (
    <>
      <div>
        <p className="question">{question}</p>
        <div className="answer-container">
          {allAnswers.map((answer, index) => (
            <label
              key={index}
              htmlFor={`${id}-${index + 1}`}
              style={getStyles(answer)}
              className="answer-label"
            >
              <input
                type="radio"
                name={id}
                id={`${id}-${index + 1}`}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleChange}
                disabled={isSubmitted}
              />
              {answer}
            </label>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
}

export default Question;
