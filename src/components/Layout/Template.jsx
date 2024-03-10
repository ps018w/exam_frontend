import React, { useEffect, useState } from 'react';
import { User, AlertTriangle } from 'react-feather';
import axios from 'axios';
import logo from '../../assets/Images/logo.jpeg';

const Template = ({ categoryId }) => {
  const [questionsData, setQuestionsData] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState([]);

  const allQuestions = () => {
    axios
      .get(`http://educomet.com.au/api/questions`)
      .then((res) => {
        // console.log('total questions==>>', res.data.data);
        setTotalQuestions(res.data.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const getQuestions = (id) => {
    // console.log('id1==>>', id);
    if (id !== undefined) {
      // console.log('id2==>>', id);
      axios
        .get(`http://educomet.com.au/api/question/${id}`)
        .then((res) => {
          // console.log('1st question==>>', res.data.results);
          setQuestionsData(res.data.results);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  const [timer, setTimer] = useState(1800);

  // const newArray = [];
  useEffect(() => {
    getQuestions(categoryId);
    // const timerInterval = setInterval(() => {
    //   setTimer((prevTimer) => prevTimer - 1);
    // }, 1000);

    // return () => clearInterval(timerInterval);
  }, [categoryId]);
  // for (let i = 1; i <= 30; i++) {
  //   newArray.push(i);
  // }

  useEffect(() => {
    allQuestions();
  }, []);

  const handleSaveAndNext = (id) => {
    axios
      .get(`http://educomet.com.au/api/question/${categoryId}?page=${id + 1}`)
      .then((nextResponse) => {
        console.log('next==>>', nextResponse.data.results);
        setQuestionsData(nextResponse.data.results);
      })
      .catch((nextError) => {
        console.error(nextError);
      });
  };

  const handlePrevious = (id) => {
    axios
      .get(`http://educomet.com.au/api/question/${categoryId}?page=${id - 1}`)
      .then((nextResponse) => {
        console.log('previous=>>', nextResponse.data.results);
        setQuestionsData(nextResponse.data.results);
      })
      .catch((nextError) => {
        console.error(nextError);
      });
  };

  const handlePagination = (id) => {
    axios
      .get(`http://educomet.com.au/api/question/${categoryId}?page=${id}`)
      .then((nextResponse) => {
        console.log('question==>>', nextResponse.data.results);
        setQuestionsData(nextResponse.data.results);
      })
      .catch((nextError) => {
        console.error(nextError);
      });
  };

  // console.log('categoryId==>>', categoryId);

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
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
                  <div className="flex gap-4">
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
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="border border-cyan-500 px-4 py-2 text-cyan-500 rounded hover:bg-cyan-500 hover:text-white">
                    Switch Full Screen
                  </button>
                  {/* <button className="border border-cyan-500 px-4 py-2 text-cyan-500 hover:bg-cyan-500 hover:text-white rounded">
                    Pause
                  </button> */}
                  {/* <label for="myfile">Select a file:</label>
                  <input type="file" id="myfile" name="myfile"></input> */}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="grid grid-cols-12 flex-1">
          {questionsData.map((question, index) => (
            <div key={question.id} id="rightSection" className="col-span-9">
              <div
                id="rightSectionHeading"
                className="border-l-0 border-r-0 border-2 bg-gray-50 px-5 h-[60px] leading-[3.5]"
              >
                <div className="flex gap-4 items-center">
                  {/* <div>Category</div> */}
                  <div className="flex gap-3 text-gray-500">
                    {/* <div className="bg-gray-900	 text-white px-2 py-1 rounded-2 font-light text-base rounded">
                    English Language
                  </div> */}
                    {/* <div className="px-2 py-1 rounded-2 font-light text-base rounded">
                    Quantitative Aptitude
                  </div> */}
                    <div className="bg-gray-900 text-white px-2 py-1 rounded-2 font-light text-base rounded">
                      {question.category}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-screen">
                <div
                  id="sectionTitle"
                  className="bg-gray-50 flex items-center justify-between px-4 py-2 border-b"
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
                    className="flex-1 overflow-auto p-4 border-r"
                    style={{
                      height: 'calc(100vh - 254px)',
                    }}
                  >
                    <div className="mb-3">
                      {/* <span>Comprehension:</span> */}
                      {/* <span>(Que No. 1 - 8)</span> */}
                    </div>
                    <div className="mb-3">
                      <strong>{question.question}</strong>
                    </div>
                    {question.question_type === 'MCQ' &&
                      question.answers.map((option, index) => (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-baseline">
                            <input type="radio" id="key1" name="fav_language" />
                            <label htmlFor="key1" className="pl-2">
                              {option.answer}
                            </label>
                          </div>
                        </div>
                      ))}
                    {question.question_type === 'PW' && (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-baseline">
                          <textarea
                            className="resize-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="questionTextarea"
                            rows="4"
                            placeholder="Type your question here..."
                          ></textarea>
                        </div>
                        <label for="avatar">Choose a image:</label>

                        <input
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/png, image/jpeg"
                        />
                      </div>
                    )}
                    {question.question_type === 'PC' && (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-baseline">
                          <img
                            src={question.img}
                            className="mr-3 sm:h-9 w-full"
                            alt="Flowbite Logo"
                            style={{ height: '160px' }}
                          />
                        </div>
                      </div>
                    )}
                    {question.question_type === 'PC' &&
                      question.answers.map((option, index) => (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-baseline">
                            <input type="radio" id="key1" name="fav_language" />
                            <label htmlFor="key1" className="pl-2">
                              {option.answer}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                  {question.question_type === 'SQ' && (
                    <div className="flex-1 p-4">
                      <div className="mb-3">Question:</div>
                      <div className="mb-3">
                        <strong className="mb-2">
                          {question.sub_question}
                        </strong>
                      </div>
                      {/* <h3>Turn the tables</h3> */}
                      {question.answers.map((option, index) => (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-baseline">
                            <input type="radio" id="key1" name="fav_language" />
                            <label htmlFor="key1" className="pl-2">
                              {option.answer}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  id="sectionFooter"
                  className="sticky bg-gray-50  shadow-sm border-t p-4 bottom-0"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button className="bg-sky-300 px-3 py-1 rounded">
                        Mark for Review & Next
                      </button>
                      <button className="bg-sky-300 px-3 py-1 rounded">
                        Clear Response
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="bg-cyan-500 text-white px-3 py-1 rounded"
                        onClick={() => handlePrevious(question.id)}
                      >
                        Previous
                      </button>
                      <button
                        className="bg-cyan-500 text-white px-3 py-1 rounded"
                        onClick={() => handleSaveAndNext(question.id)}
                      >
                        Save & Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div id="leftSection" className="col-span-3 bg-cyan-50">
            <div className="flex flex-col min-h-screen">
              {/* <div
                id="leftSectionHeading"
                className="border-l-0 border-r-0 border-2 px-5 h-[60px] leading-[3.5]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-500 flex items-center overflow-hidden rounded-full h-[35px] w-[35px] justify-center">
                    <User size="18" color="white" />
                  </div>
                  <div className="font-semibold">Balram</div>
                </div>
              </div> */}
              <div className="flex-1">
                <div className="border-b grid grid-cols-12 items-center gap-y-4 gap-x-2 px-3 py-4 text-[13px]">
                  <div className="flex gap-2 items-center col-span-6">
                    <div className="bg-green-500 h-[22px] leading-[2] rounded-tl-full rounded-tr-full text-center text-white text-xs w-[35px]">
                      1
                    </div>

                    <span className="text-nowrap">Answered</span>
                  </div>
                  {/* <div className="flex gap-2 items-center col-span-6">
                    <span className="bg-red-500 flex  items-center px-2 rounded-full text-white text-xs h-6">
                      0
                    </span>
                    <span className="text-nowrap">Marked</span>
                  </div> */}
                  <div className="flex gap-2 col-span-6">
                    <span className="border border-gray-600 p-1 text-xs bg-white">
                      29
                    </span>
                    <span className="text-nowrap">Not Visited</span>
                  </div>
                  <div className="flex gap-2 items-center col-span-6">
                    <span className="bg-red-500 flex  items-center px-2 rounded-full text-white text-xs h-6">
                      0
                    </span>
                    <span className="text-nowrap">Answered for revisit</span>
                  </div>
                  <div className="flex gap-2 items-center col-span-6">
                    {/* <div className="w-[35px] text-center text-white h-[22px] rounded-bl-full rounded-br-full bg-amber-500">
                      0
                    </div>

                    <span>Not Answered</span> */}
                  </div>
                </div>
                <div className="bg-sky-300 flex gap-2 px-4 py-2 mb-4">
                  <span className="font-semibold">SECTION :</span>
                  <span>English</span>
                </div>
                <div className="px-4 flex flex-col gap-4">
                  <div className="gap-4 grid grid-cols-12">
                    {totalQuestions?.map((data, index) => (
                      <div
                        key={data}
                        className="text-center bg-white border border-gray-300 p-1 px-3 py-2 rounded text-xs col-span-2 cursor-pointer"
                        onClick={() => handlePagination(data.id)}
                      >
                        {data.id}
                      </div>
                    ))}
                  </div>
                  <div>
                    {/* <button className="bg-cyan-500 text-white px-3 py-1 rounded">
                      Submit Section
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="border sticky bottom-0 p-4">
                {/* <div className="flex gap-4 items-center justify-between mb-3">
                  <button className="bg-sky-300 px-3 py-1 rounded w-1/2">
                    Question Paper
                  </button>
                  <button className="bg-sky-300 px-3 py-1 rounded w-1/2">
                    Instructions
                  </button>
                </div> */}
                <button className="bg-cyan-500 text-white px-3 py-1 rounded w-full">
                  Final Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
