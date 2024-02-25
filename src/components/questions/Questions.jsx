import { useState, useEffect } from "react";
import SerialQuestion from "../serialQuestion/SerialQuestion";

function Questions({ questionsData }) {
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(1800);
  const [subjectiveAnswer, setSubjectiveAnswer] = useState(""); // Added state for subjective answers

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubjectiveChange = (event) => {
    setSubjectiveAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    const currentQuestionData = questionsData[currentQuestion];

    if (currentQuestionData.type === "subjective") {
      if (subjectiveAnswer.trim() !== "") {
        setScore((prevScore) => prevScore + 1);
      }
    } else if (selectedOption === currentQuestionData.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedOption("");
    setSubjectiveAnswer("");
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleQuestionChange = (questionNumber) => {
    setCurrentQuestion(questionNumber - 1);
    if (!attemptedQuestions.includes(questionNumber - 1)) {
      setAttemptedQuestions([...attemptedQuestions, questionNumber - 1]);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    console.log("file:", file);
  };

  // const handleNextQuestion = () => {
  //   if (
  //     selectedOption === questionsData[currentQuestion].correctAnswer ||
  //     questionsData[currentQuestion].type === "subjective"
  //   ) {
  //     if (
  //       questionsData[currentQuestion].type === "subjective" &&
  //       subjectiveAnswer.trim() !== ""
  //     ) {
  //       setScore((prevScore) => prevScore + 1);
  //     } else if (questionsData[currentQuestion].type !== "subjective") {
  //       setScore((prevScore) => prevScore + 1);
  //     }
  //   }

  //   setSelectedOption("");
  //   setSubjectiveAnswer("");
  //   setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  // };

  return (
    <div>
      {timer > 0 && currentQuestion < questionsData.length ? (
        <>
          <h1>Quiz App</h1>
          <p>
            Time Remaining: {Math.floor(timer / 60)}:{timer % 60}
          </p>
          <p>Question {currentQuestion + 1}:</p>
          {questionsData[currentQuestion].type === "subjective" ? (
            <div>
              <p>{questionsData[currentQuestion].question}</p>
              <textarea
                value={subjectiveAnswer}
                onChange={handleSubjectiveChange}
              />
              <input type="file" accept="image/*" onChange={handleUpload} />
            </div>
          ) : (
            <>
              <p>{questionsData[currentQuestion].question}</p>
              <ul>
                {questionsData[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="radio"
                        name="options"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionSelect(option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button onClick={handleNextQuestion}>Next Question</button>
        </>
      ) : (
        <div>
          <h1>Quiz Results</h1>
          <p>
            Your Score: {score} out of {questionsData.length}
          </p>
          <p>Time's Up!</p>
        </div>
      )}
      <SerialQuestion
        totalQuestions={questionsData.length}
        onQuestionChange={handleQuestionChange}
        attemptedQuestions={attemptedQuestions}
      />
    </div>
  );
}

export default Questions;
