function Question({ question }) {
  return (
    <div>
      <p>{question}</p>
      <label>
        <input type="radio" name="question1" value="option1" />
        Option 1
      </label>
      <label>
        <input type="radio" name="question1" value="option2" />
        Option 2
      </label>
      <label>
        <input type="radio" name="question1" value="option3" />
        Option 3
      </label>
      <label>
        <input type="radio" name="question1" value="option4" />
        Option 4
      </label>
      <hr></hr>
    </div>
  );
}

export default Question;
