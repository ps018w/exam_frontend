import React from "react";
import "./pagination.css";

function Pagination({ questionsData, color, handleQuestionClick }) {
  return (
    <div className="pagination-container">
      <h2>Questions Number</h2>
      <ul style={{ listStyleType: "none" }} className="ul">
        {questionsData.map((question) => (
          <li key={question.id}>
            <button
              style={{ backgroundColor: color(question.id) }}
              onClick={() => handleQuestionClick(question.id)}
              className="pagination-container button"
            >
              {question.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
