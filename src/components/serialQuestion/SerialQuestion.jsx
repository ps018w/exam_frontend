import React from "react";
import "./serialQuestion.css";

const QuestionButton = ({ number, onClick, isAttempted }) => (
  <button
    className={isAttempted ? "attempted" : ""}
    onClick={() => onClick(number)}
  >
    {number}
  </button>
);

const SerialQuestion = ({
  totalQuestions,
  onQuestionChange,
  attemptedQuestions,
}) => (
  <div>
    {[...Array(totalQuestions)].map((_, index) => (
      <QuestionButton
        key={index}
        number={index + 1}
        isAttempted={attemptedQuestions.includes(index)}
        onClick={onQuestionChange}
      />
    ))}
  </div>
);

export default SerialQuestion;
