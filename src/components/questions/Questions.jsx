import React, { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import "./question.css";

const questionsData = [
  {
    id: "1",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    is_attempt: false,
    is_marked_for_review: false,
  },
  {
    id: "2",
    question: "What is the capital of Spain?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Madrid",
    is_attempt: false,
    is_marked_for_review: false,
  },
  {
    id: "3",
    question: "What is the capital of Italy?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Rome",
    is_attempt: false,
    is_marked_for_review: false,
  },
  {
    id: "4",
    question: "What is the capital of Germany?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Berlin",
    is_attempt: false,
    is_marked_for_review: false,
  },
  {
    id: "5",
    question: "What is the capital of India?",
    options: ["Berlin", "Madrid", "Delhi", "Rome"],
    correctAnswer: "Delhi",
    is_attempt: false,
    is_marked_for_review: false,
  },
];

// const questionsData = [
//   {
//     id: "1",
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Paris",
//     is_attempt: false,
//     is_marked_for_review: false,
//   },
//   {
//     id: "2",
//     question: "What is the capital of Spain?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Madrid",
//     is_attempt: false,
//     is_marked_for_review: false,
//   },
//   {
//     id: "3",
//     question: "What is the capital of Italy?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Rome",
//     is_attempt: false,
//     is_marked_for_review: false,
//   },
//   {
//     id: "4",
//     question: "What is the capital of Germany?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Berlin",
//     is_attempt: false,
//     is_marked_for_review: false,
//   },
//   {
//     id: "5",
//     question: "What is the capital of India?",
//     options: ["Berlin", "Madrid", "Delhi", "Rome"],
//     correctAnswer: "Delhi",
//     is_attempt: false,
//     is_marked_for_review: false,
//   },
// ];

const Questions = () => {
  // State to track attempts and review status for each question---
  const [questionStatus, setQuestionStatus] = useState({});
  // State to track the current question index--
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChange = (index) => {
    // console.log("line 54==>>", questionsData[currentQuestionIndex].id);
    setQuestionStatus({
      ...questionStatus,
      [questionsData[currentQuestionIndex].id]: {
        ...questionStatus[questionsData[currentQuestionIndex].id],
        selectedOption: index,
      },
    });
  };

  // Function to handle click on a question---
  const handleQuestionClick = (questionId) => {
    if (!questionStatus[questionId]) {
      setQuestionStatus({
        ...questionStatus,
        [questionId]: {
          visited: true,
          is_attempt: false,
          is_marked_for_review: false,
        },
      });
    }

    setCurrentQuestionIndex(
      questionsData.findIndex((question) => question.id === questionId)
    );
  };

  const initializeQuestionStatus = () => {
    const initialStatus = {
      [questionsData[0].id]: {
        visited: true,
        is_attempt: false,
        is_marked_for_review: false,
      },
    };
    setQuestionStatus(initialStatus);
  };

  // Initialize question status when component mounts---
  useEffect(() => {
    initializeQuestionStatus();
  }, []);

  const handlePrevious = (questionId) => {
    if (questionId > 0) {
      const selectedOption = questionStatus[questionId]?.selectedOption;

      if (selectedOption !== undefined) {
        setQuestionStatus((prevStatus) => ({
          ...prevStatus,
          [questionId]: {
            ...prevStatus[questionId],
            is_attempt: true,
            is_marked_for_review: false,
          },
          [questionsData[currentQuestionIndex - 1]?.id]: {
            ...prevStatus[questionsData[currentQuestionIndex - 1]?.id],
            visited: true,
          },
        }));
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
      } else {
        setQuestionStatus((prevStatus) => ({
          ...prevStatus,
          [questionId]: {
            ...prevStatus[questionId],
            is_attempt: false,
            is_marked_for_review: false,
            visited_but_not_attempt: true,
            visited: false,
          },
          [questionsData[currentQuestionIndex - 1]?.id]: {
            ...prevStatus[questionsData[currentQuestionIndex - 1]?.id],
            visited: true,
          },
        }));
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
      }
    }
  };

  const handleAttempt = (questionId) => {
    const selectedOption = questionStatus[questionId]?.selectedOption;
    console.log("line 108==>>", selectedOption);

    if (selectedOption !== undefined) {
      setQuestionStatus((prevStatus) => ({
        ...prevStatus,
        [questionId]: {
          ...prevStatus[questionId],
          is_attempt: true,
          is_marked_for_review: false,
        },
        [questionsData[currentQuestionIndex + 1]?.id]: {
          // Update status of next question---
          ...prevStatus[questionsData[currentQuestionIndex + 1]?.id],
          visited: true,
        },
      }));
      // Move to the next question---
      if (currentQuestionIndex + 1 < questionsData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      setQuestionStatus((prevStatus) => ({
        ...prevStatus,
        [questionId]: {
          ...prevStatus[questionId],
          is_attempt: false,
          is_marked_for_review: false,
          visited_but_not_attempt: true,
          visited: false,
        },
        [questionsData[currentQuestionIndex + 1]?.id]: {
          // Update status of next question---
          ...prevStatus[questionsData[currentQuestionIndex + 1]?.id],
          visited: true,
        },
      }));
      if (currentQuestionIndex + 1 < questionsData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };
  // console.log("line 123==>>", questionStatus);

  // Function to mark a question for review---
  const handleMarkForReview = (questionId) => {
    setQuestionStatus((prevStatus) => ({
      ...prevStatus,
      [questionId]: {
        ...prevStatus[questionId],
        is_attempt: false,
        is_marked_for_review: true,
      },
      [questionsData[currentQuestionIndex + 1]?.id]: {
        // Update status of next question---
        ...prevStatus[questionsData[currentQuestionIndex + 1]?.id],
        visited: true,
      },
    }));
    // Move to the next question
    if (currentQuestionIndex + 1 < questionsData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to change pagination button color based on completion status---
  const buttonColor = (questionId) => {
    const status = questionStatus[questionId] || {};
    // console.log("line 133==>>", questionStatus);
    if (status.is_attempt) {
      return "green"; // Question visited and attempted---
    } else if (status.visited) {
      // console.log(status);
      return status.is_marked_for_review ? "grey" : "skyblue"; // Question visited but not attempted---
    } else if (status.visited_but_not_attempt) {
      return ""; // Question not visited---
    }
  };

  return (
    <div className="exam-portal">
      <div className="question-container">
        <h2>Question Area</h2>
        {/* Render the current question---*/}
        <div>
          <h3>Question {questionsData[currentQuestionIndex].id}</h3>
          <p>{questionsData[currentQuestionIndex].question}</p>
          {/* Render options with checkboxes---- */}
          <ul>
            {questionsData[currentQuestionIndex].options.map(
              (option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      checked={
                        questionStatus[questionsData[currentQuestionIndex].id]
                          ?.selectedOption === index
                      }
                      onChange={() => handleChange(index)}
                    />
                    {option}
                  </label>
                </li>
              )
            )}
          </ul>
          {/* Add question content rendering logic */}
          <div className="buttons">
            <div>
              <button
                onClick={() =>
                  handlePrevious(questionsData[currentQuestionIndex].id)
                }
              >
                Back
              </button>
              <button
                onClick={() =>
                  handleAttempt(questionsData[currentQuestionIndex].id)
                }
              >
                Save and Next
              </button>
              <button
                onClick={() =>
                  handleMarkForReview(questionsData[currentQuestionIndex].id)
                }
              >
                Revisit
              </button>
            </div>
            <div>
              <button data-toggle="modal" data-target="#exampleModal">
                Final Submit
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Are you sure you want to submit !!
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    {/* <div class="modal-body">
                                            ...
                                        </div> */}
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="button" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        questionsData={questionsData}
        color={buttonColor}
        handleQuestionClick={handleQuestionClick}
      />
    </div>
  );
};

export default Questions;
