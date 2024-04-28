import React, { useEffect, useState } from 'react';
import { User, AlertTriangle } from 'react-feather';
import axios from 'axios';
import logo from '../../assets/Images/logo.jpeg';
import Pagination from './Pagination';
import { current } from '@reduxjs/toolkit';
import {
  fetchFirstQuestions,
  fetchOptionByQuestion,
} from '../../Feature/questionsSlice';
import { fetchNextQuestion } from '../../Feature/questionsSlice';
import { fetchPreviousQuestion } from '../../Feature/questionsSlice';
import { fetchQuestionsByPagination } from '../../Feature/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Template = ({ categoryId }) => {
  const [loadingSymbol, setLoadingSymbol] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [markedForRevisit, setMarkedForRevisit] = useState([]);
  const [saveAndNext, setSaveAndNext] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  // const [currentQuestionId, setCurrentQuestionId] = useState(null);

  const initialQuestions = totalQuestions.map((question) => ({
    ...question,
    attempted: false,
  }));
  const [questions, setQuestions] = useState(initialQuestions);
  // const [startTime, setStartTime] = useState(4);
  // const [endTime, setEndTime] = useState(4);

  const dispatch = useDispatch();

  // const [timer, setTimer] = useState(1800);

  // const newArray = [];
  // useEffect(() => {
  //   getQuestions(categoryId);
  //   // const timerInterval = setInterval(() => {
  //   //   setTimer((prevTimer) => prevTimer - 1);
  //   // }, 1000);

  //   // return () => clearInterval(timerInterval);
  // }, [categoryId]);
  // for (let i = 1; i <= 30; i++) {
  //   newArray.push(i);
  // }

  const { allQuestion, loading, error } = useSelector(
    (state) => state.getQuestions,
  );

  useEffect(() => {
    dispatch(fetchFirstQuestions(categoryId));
  }, [dispatch, categoryId]);

  // const handleNext = (id) => {
  //   const nextId = id + 1;
  //   dispatch(fetchNextQuestion({ categoryId, nextId }));
  // };

  // const timeSpent = endTime - startTime;
  // const secondsSpent = Math.abs(timeSpent);
  // console.log('secondsSpent', secondsSpent);

  const handleSubmit = async (id) => {
    const userAnswer = {
      question: id,
      user_answer: [selectedOption],
      // time_taken: 'your_time_value',
    };

    try {
      // Axios POST request with access token in headers
      const response = axios.post(
        'http://44.221.201.10/api/user_answer/',
        userAnswer,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem('key')).accessToken
            }`,
            'Content-Type': 'application/json', // If required by your API
          },
        },
      );

      setSelectedOption(null);

      // Dispatch action to fetch the next question
      setLoadingSymbol(true);
      const nextId = id + 1;
      dispatch(fetchNextQuestion({ categoryId, nextId }));
      if (selectedOption) {
        setSaveAndNext((prev) => [...prev, id]);
      }
    } catch (error) {
      console.error('Error', error);
    }
    setLoadingSymbol(false);

    // Handle the response as needed

    // console.log("shubham srivastava")
  };

  const handlePrevious = (id) => {
    setLoadingSymbol(true);
    const previousId = id - 1;
    dispatch(fetchPreviousQuestion({ categoryId, previousId }));
    setLoadingSymbol(false);
  };

  const handleChange = (e, optionId) => {
    // console.log("optionId ==>>", optionId);
    // console.log("e ==>>", e);
    // e.preventDefault();
    if (e.target.checked) {
      setSelectedOption(optionId);
    }
    // const selectedOptionId = e.target.value;

    // console.log('optionSelected-->>', e.target.value);
  };

  const handlePagination = (id) => {
    // setCurrentQuestionId(id);
    // setLoadingSymbol(true)
    dispatch(fetchQuestionsByPagination({ categoryId, id }));
    // setLoadingSymbol(false)
  };

  const handleValue = (id) => {
    dispatch(fetchOptionByQuestion({ id }));
  };

  const handleRevisit = (id) => {
    const nextId = id + 1;
    dispatch(fetchNextQuestion({ categoryId, nextId }));
    if (selectedOption) {
      setMarkedForRevisit((prev) => [...prev, id]);
    }
    setSelectedOption(null);
  };

  // console.log("markedForRevisit", markedForRevisit)
  // console.log("saveAndNext", saveAndNext)

  const allQuestions = () => {
    axios
      .get('http://44.221.201.10/api/questions')
      .then((res) => {
        setTotalQuestions(res.data.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleClear = () => {
    // setSelectedOption(null);

    const inputs = document.querySelectorAll(
      'input[type="checkbox"], input[type="radio"]',
    );
    inputs.forEach((input) => {
      input.checked = false;
    });
  };

  useEffect(() => {
    allQuestions();
  }, []);
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Get the data URL representing the file content
        const imageUrl = reader.result;
        // Update state with the image URL
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImg = () => {
    setImageUrl(null);
  };
  console.log('ffefefefe', imageUrl);
  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      {loading ? (
        <div
          role="status"
          className="flex font-light items-center justify-center text-2xl h-screen"
        >
          <svg
            aria-hidden="true"
            className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-400 fill-indigo-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-wrap justify-between items-center">
                <div id="logoSection" className="flex items-center gap-4">
                  <a href="#" className="flex items-center">
                    <img
                      src={logo}
                      className="mr-3 h-6 sm:h-9"
                      alt="Flowbite Logo"
                    />
                  </a>
                  {/* <div className="text-darkslategray">
                  IBPS PO Prelims Full Test 1
                </div> */}
                </div>
                <div
                  id="timerSection"
                  className="flex items-center gap-5 w-1/2 justify-between"
                >
                  <div id="timer" className="font-semibold">
                    {/* <div className="flex gap-4">
                    <span>Section Time</span>
                    <div className="flex gap-2 items-center">
                      <span className="bg-black text-white px-[5px] text-sm">
                        {Math.floor(timer / 60)}
                      </span>
                      :
                      <span className="bg-black text-white px-[5px] text-sm">
                        {timer % 60}
                      </span>
                    </div>
                  </div> */}
                    {/* <Timer /> */}
                  </div>
                  {/* <div className="flex gap-4">
                  <button className="border border-cyan-500 px-4 py-2 text-cyan-500 rounded hover:bg-cyan-500 hover:text-white">
                    Switch Full Screen
                  </button>
                </div> */}
                </div>
              </div>
            </nav>
          </header>
          <div className="lg:grid grid-cols-12 flex-1">
            {allQuestion.map((question, index) => (
              <div key={question.id} id="rightSection" className="col-span-9">
                <div
                  id="rightSectionHeading"
                  className="border-l-0 border-r-0 border bg-indigo-50 px-5  leading-[3.5] border-gray-300"
                >
                  <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r to-indigo-800 from-cyan-400">
                    {question.category}
                  </span>
                </div>
                <div className="flex flex-col h-screen">
                  <div
                    id="sectionTitle"
                    className="bg-indigo-50 flex items-center justify-between px-4 py-2 border-b border-gray-300"
                  >
                    <div className="font-semibold">
                      Question No. {question.id}
                    </div>
                    {/* <div className="flex font-light gap-4 items-center text-base">
                  <div className="flex flex-col">
                    <span>Marks</span>
                    <div className="flex items-center gap-3">
                      <span className="bg-green-500 inline-block px-2 rounded-full text-white text-xs">
                        +1
                      </span>
                      <span className="bg-red-500 inline-block px-2 rounded-full text-white text-xs">
                        -0.25
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span>Time</span>
                    <span>00:06</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div>View in</div>
                    <select
                      id="options"
                      name="options"
                      className="border px-2 py-1 rounded text-sm"
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span>
                      <AlertTriangle size={14} />
                    </span>
                    <span>Report</span>
                  </div>
                </div> */}
                  </div>
                  <div id="sectionBody" className="flex overflow-auto flex-1">
                    <div
                      className="flex-1 overflow-auto p-4"
                      style={{
                        height: 'calc(100vh - 254px)',
                      }}
                    >
                      <div className="mb-3">
                        <strong>{question.question}</strong>
                      </div>
                      {question.question_type === 'MCQ' && (
                        <div className="mb-6">
                          {question.img !== null && (
                            <img
                              src={question.img}
                              className="w-auto max-w-[24rem] h-auto max-h-[14rem] object-contain"
                              alt="Flowbite Logo"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex flex-col gap-4">
                        {question.question_type === 'MCQ' &&
                          question.answers.map((option, index) => (
                            <div className="flex items-center gap-2">
                              {option.answer !== null && (
                                <input
                                  className="obds-checkbox"
                                  type="checkbox"
                                  id={option.id}
                                  name="fav_language"
                                  value={selectedOption}
                                  onChange={(e) => handleChange(e, option.id)}
                                />
                              )}
                              {option.img !== null ? (
                                <label htmlFor="key1">
                                  <div>
                                    <img
                                      src={option.img}
                                      className="w-auto max-w-[24rem] h-auto max-h-[14rem] object-contain"
                                    />
                                  </div>
                                </label>
                              ) : (
                                <>
                                  {option.answer !== null && (
                                    <label htmlFor="key1">
                                      <div>{option.answer}</div>
                                    </label>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                      </div>
                      {question.question_type === 'PW' && (
                        <>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-baseline">
                              <textarea
                                className="resize-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="questionTextarea"
                                rows="4"
                                placeholder="Type your question here..."
                              ></textarea>
                            </div>
                            <div className="flex items-center space-x-6">
                              {imageUrl && (
                                <div className="border border-gray-300 p-2 rounded-lg shadow-sm shrink-0 relative">
                                  <img
                                    id="preview_img"
                                    className="h-16 w-16 object-cover rounded"
                                    src={imageUrl}
                                    alt="Current profile photo"
                                  />
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="red"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="feather feather-x-circle absolute  cursor-pointer bg-white -top-[6px] -right-[7px]"
                                    onClick={() => removeImg()}
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m15 9-6 6M9 9l6 6" />
                                  </svg>
                                </div>
                              )}
                              <label className="block">
                                <span className="sr-only">
                                  Choose profile photo
                                </span>
                                <input
                                  type="file"
                                  onChange={(e) => onChangeFile(e)}
                                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                />
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                      {question.question_type === 'SQ' && (
                        <div className="mb-6">
                          {question.img !== null && (
                            <img
                              src={question.img}
                              className="w-auto max-w-[24rem] h-auto max-h-[14rem] object-contain"
                              alt="Flowbite Logo"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex flex-col gap-4">
                        {question.question_type === 'SQ' &&
                          question.answers.map((option, index) => (
                            <div
                              className="flex items-center gap-2"
                              key={index}
                            >
                              <input
                                className="obds-radio"
                                type="radio"
                                id={option.id}
                                name="fav_language"
                                value={selectedOption}
                                onChange={(e) => handleChange(e, option.id)}
                              />
                              {option.img !== null ? (
                                <label htmlFor="key1">
                                  <div>
                                    <img
                                      src={option.img}
                                      className="w-auto max-w-[24rem] h-auto max-h-[3rem] object-contain"
                                    />
                                  </div>
                                </label>
                              ) : (
                                <>
                                  {option.answer !== null && (
                                    <label htmlFor="key1">
                                      <div>{option.answer}</div>
                                    </label>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                    {question.question_type === 'PC' && (
                      <div className="flex-1 p-4">
                        <div className="mb-3">Question:</div>
                        <div className="mb-3">
                          <strong className="mb-2">
                            {question.sub_question}
                          </strong>
                        </div>
                        {question.answers.map((option, subIndex) => (
                          <div className="mb-6" key={subIndex}>
                            {question.img !== null && (
                              <img
                                src={question.img}
                                className="w-auto max-w-[24rem] h-auto max-h-[14rem] object-contain"
                                alt="Flowbite Logo"
                              />
                            )}
                          </div>
                        ))}
                        <div className="flex flex-col gap-4">
                          {question.question_type === 'PC' &&
                            question.answers.map((option, index) => (
                              <div className="flex items-center gap-2">
                                {option.answer !== null && (
                                  <input
                                    type="radio"
                                    id={option.id}
                                    name="fav_language"
                                    value={selectedOption}
                                    onChange={(e) => handleChange(e, option.id)}
                                    className="obds-radio"
                                  />
                                )}
                                {option.img !== null ? (
                                  <label htmlFor="key1">
                                    <div>
                                      <img
                                        src={option.img}
                                        className="w-auto max-w-[24rem] h-auto max-h-[14rem] object-contain"
                                      />
                                    </div>
                                  </label>
                                ) : (
                                  <>
                                    {option.answer !== null && (
                                      <label htmlFor="key1">
                                        <div>{option.answer}</div>
                                      </label>
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    id="sectionFooter"
                    className="sticky bg-indigo-50  shadow-sm border-t p-4 bottom-0 border-gray-300"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <button
                          className="hidden lg:block py-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none"
                          onClick={() => handleRevisit(question.id)}
                        >
                          Mark for Review & Next
                        </button>
                        <button
                          className="py-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none"
                          onClick={handleClear}
                        >
                          Clear Response
                        </button>
                        <button className="block lg:hidden py-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none">
                          Final Submit
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          className="py-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none"
                          onClick={() => handlePrevious(question.id)}
                        >
                          Previous
                        </button>
                        <button
                          className="py-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none"
                          onClick={() => handleSubmit(question?.id)}
                        >
                          Save & Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div id="leftSection" className="col-span-3 bg-indigo-50">
              <div className="flex flex-col min-h-screen border border-gray-300">
                <div className="flex-1">
                  <div className="border-b grid grid-cols-12 items-center gap-y-4 gap-x-2 px-3 py-4 text-[13px]">
                    <div className="flex gap-2 items-center col-span-6">
                      <div className="flex h-6 items-center  p-4 rounded text-white text-xs bg-green-500 font-bold">
                        1
                      </div>

                      <span className="text-nowrap">Answered</span>
                    </div>
                    <div className="flex gap-2 col-span-6 items-center">
                      <span className="bg-white border border-gray-300 flex font-bold h-6 items-center p-4 px-3 rounded text-xs">
                        29
                      </span>
                      <span className="text-nowrap">Not Visited</span>
                    </div>
                    <div className="flex gap-2 items-center col-span-6">
                      <span className="bg-violet-700 flex h-6 items-center  p-4 rounded text-white text-xs font-bold">
                        0
                      </span>
                      <span className="text-nowrap">Answered for revisit</span>
                    </div>
                    <div className="flex gap-2 items-center col-span-6"></div>
                  </div>
                  <div className="bg-indigo-600 text-white flex gap-2 px-4 py-2 mb-4">
                    <span className="font-semibold">SECTION :</span>
                    <span>{totalQuestions[0]?.category}</span>
                  </div>
                  <div className="px-4 flex flex-col gap-4">
                    <div className="gap-4 grid grid-cols-12">
                      {totalQuestions?.map((data, index) => (
                        <div
                          key={data}
                          className={`font-bold text-center  border border-gray-300 p-1 px-3 py-2 rounded text-xs col-span-2 cursor-pointer ${
                            saveAndNext.includes(data.id) === true
                              ? 'bg-green-500 text-white'
                              : markedForRevisit.includes(data.id) === true
                              ? 'bg-violet-700 text-white'
                              : 'bg-white'
                          }`}
                          onClick={() => {
                            handlePagination(data.id);
                            handleValue(data.id);
                          }}
                        >
                          {data.id}
                        </div>
                      ))}
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="border-gray-300 border-t bottom-0 p-4 sticky">
                  <button className="inline-flex items-center justify-center w-full py-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none">
                    Final Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
