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
    if (!isSubmitted) return {};
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
        <p>{question}</p>
        {allAnswers.map((answer, index) => (
          <label
            key={index}
            htmlFor={`${id}-${index + 1}`}
            style={getStyles(answer)}
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
      <hr />
    </>
  );
}

export default Question;
