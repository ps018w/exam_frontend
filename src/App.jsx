import Questions from "./components/questions/Questions";

// const questionsData = [
//   {
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Paris",
//   },
//   {
//     question: "What is the capital of Spain?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Madrid",
//   },
//   {
//     question: "What is the capital of Italy?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Rome",
//   },
//   {
//     question: "What is the capital of Germany?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Berlin",
//   },
//   {
//     question: "What is the capital of India?",
//     options: ["Berlin", "Madrid", "Delhi", "Rome"],
//     correctAnswer: "Delhi",
//   },
// ];

// const questionsData = [
//   {
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Paris",
//     type: "multipleChoice",
//   },
//   {
//     question: "What is the capital of Spain?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Madrid",
//     type: "multipleChoice",
//   },
//   {
//     question: "What is the capital of Italy?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Rome",
//     type: "multipleChoice",
//   },
//   {
//     question: "What is the capital of Germany?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Berlin",
//     type: "multipleChoice",
//   },
//   {
//     question:
//       "Provide your opinion on climate change. You can use the textarea for your response.",
//     type: "subjective",
//   },
//   {
//     question: "Upload an image related to your favorite travel destination.",
//     type: "subjective",
//   },
//   {
//     question: "What is the capital of India?",
//     options: ["Berlin", "Madrid", "Delhi", "Rome"],
//     correctAnswer: "Delhi",
//     type: "multipleChoice",
//   },
// ];

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

const App = () => {
  return <Questions questionsData={questionsData} />;
};

export default App;
