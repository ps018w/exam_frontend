import React from "react";

function Pagination({ questionsData, color, handleQuestionClick }) {
  return (
    <div className="pagination">
      <h2>Pagination</h2>
      <ul>
        {questionsData.map((question) => (
          <li key={question.id}>
            <button
              style={{ backgroundColor: color(question.id) }}
              onClick={() => handleQuestionClick(question.id)}
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
